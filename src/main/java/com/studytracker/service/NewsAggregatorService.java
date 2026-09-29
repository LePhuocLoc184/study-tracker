package com.studytracker.service;

import com.studytracker.dto.NewsItem;
import com.studytracker.dto.NewsResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

/**
 * Aggregates news from multiple RSS sources.
 * - Config-driven: add a new source by adding a NewsSourceConfig entry.
 * - In-memory cache with TTL to avoid hammering external feeds.
 * - Source isolation: one source failure does not affect others.
 * - Deduplication by canonical URL.
 * - Sorting by publishedAt descending.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class NewsAggregatorService {

    private final NewsFetcher newsFetcher;

    /** Cache TTL in milliseconds (15 minutes) */
    private static final long CACHE_TTL_MS = 15 * 60 * 1000;

    /** Cached articles */
    private final AtomicReference<List<NewsItem>> cachedItems = new AtomicReference<>(List.of());
    private volatile long lastFetchTime = 0;
    private volatile boolean fetching = false;

    /**
     * All registered RSS sources.
     * To add a new source: just add a new entry here.
     */
    private static final List<NewsSourceConfig> SOURCES = List.of(
            // 🇻🇳 Vietnam
            NewsSourceConfig.builder()
                    .id("VNEXPRESS")
                    .displayName("VnExpress Công nghệ")
                    .feedUrl("https://vnexpress.net/rss/so-hoa.rss")
                    .language("vi")
                    .defaultCategory("GENERAL_TECH")
                    .build(),

            // 🌎 International
            NewsSourceConfig.builder()
                    .id("SPRING")
                    .displayName("Spring Blog")
                    .feedUrl("https://spring.io/blog.atom")
                    .language("en")
                    .defaultCategory("SPRING")
                    .build(),

            NewsSourceConfig.builder()
                    .id("BAELDUNG")
                    .displayName("Baeldung")
                    .feedUrl("https://www.baeldung.com/feed")
                    .language("en")
                    .defaultCategory("JAVA")
                    .build(),

            NewsSourceConfig.builder()
                    .id("DEV_TO")
                    .displayName("DEV Community")
                    .feedUrl("https://dev.to/feed")
                    .language("en")
                    .defaultCategory("WEB_DEVELOPMENT")
                    .build(),

            NewsSourceConfig.builder()
                    .id("INFOQ")
                    .displayName("InfoQ")
                    .feedUrl("https://feed.infoq.com/")
                    .language("en")
                    .defaultCategory("BACKEND")
                    .build(),

            NewsSourceConfig.builder()
                    .id("DZONE")
                    .displayName("DZone")
                    .feedUrl("https://feeds.dzone.com/java")
                    .language("en")
                    .defaultCategory("JAVA")
                    .build()
    );

    /**
     * Get aggregated news, optionally filtered.
     */
    public NewsResponse getNews(String category, String language, String source, int limit) {
        List<NewsItem> all = getCachedOrFetch();

        List<NewsItem> filtered = all.stream()
                .filter(item -> category == null || category.isBlank() || category.equalsIgnoreCase(item.getCategory()))
                .filter(item -> language == null || language.isBlank() || language.equalsIgnoreCase(item.getLanguage()))
                .filter(item -> source == null || source.isBlank() || source.equalsIgnoreCase(item.getSource()))
                .limit(limit > 0 ? limit : 30)
                .collect(Collectors.toList());

        return NewsResponse.builder()
                .items(filtered)
                .total(filtered.size())
                .cached(System.currentTimeMillis() - lastFetchTime < CACHE_TTL_MS && !cachedItems.get().isEmpty())
                .build();
    }

    /**
     * Returns cached data if still valid, otherwise triggers a refresh.
     */
    private List<NewsItem> getCachedOrFetch() {
        long now = System.currentTimeMillis();
        if (now - lastFetchTime < CACHE_TTL_MS && !cachedItems.get().isEmpty()) {
            return cachedItems.get();
        }

        // Prevent concurrent fetches
        synchronized (this) {
            // Double-check after acquiring lock
            if (now - lastFetchTime < CACHE_TTL_MS && !cachedItems.get().isEmpty()) {
                return cachedItems.get();
            }

            if (fetching) {
                return cachedItems.get(); // Return stale cache while another thread fetches
            }
            fetching = true;
        }

        try {
            List<NewsItem> freshItems = fetchAllSources();
            cachedItems.set(freshItems);
            lastFetchTime = System.currentTimeMillis();
            log.info("News cache refreshed: {} articles from {} sources", freshItems.size(), SOURCES.size());
        } finally {
            fetching = false;
        }

        return cachedItems.get();
    }

    /**
     * Fetch from ALL sources, aggregate, deduplicate, sort.
     */
    private List<NewsItem> fetchAllSources() {
        List<NewsItem> all = new ArrayList<>();

        for (NewsSourceConfig src : SOURCES) {
            try {
                List<NewsItem> items = newsFetcher.fetch(src);
                all.addAll(items);
            } catch (Exception e) {
                log.error("Source {} failed completely: {}", src.getId(), e.getMessage());
                // Continue to next source — source isolation
            }
        }

        // Deduplicate by canonical URL
        all = deduplicate(all);

        // Sort by publishedAt descending (newest first), nulls last
        all.sort(Comparator.comparing(
                NewsItem::getPublishedAt,
                Comparator.nullsLast(Comparator.reverseOrder())
        ));

        return all;
    }

    /**
     * Remove duplicate articles based on normalized URL.
     */
    private List<NewsItem> deduplicate(List<NewsItem> items) {
        Set<String> seen = new HashSet<>();
        List<NewsItem> unique = new ArrayList<>();

        for (NewsItem item : items) {
            String key = normalizeUrl(item.getUrl());
            if (key != null && seen.add(key)) {
                unique.add(item);
            }
        }
        return unique;
    }

    /**
     * Strip query params (utm_*, ref, etc.) for dedup comparison.
     */
    private String normalizeUrl(String rawUrl) {
        if (rawUrl == null || rawUrl.isBlank()) return null;
        try {
            URI uri = URI.create(rawUrl);
            // Keep scheme + host + path only
            return uri.getScheme() + "://" + uri.getHost() + uri.getPath();
        } catch (Exception e) {
            return rawUrl;
        }
    }
}
