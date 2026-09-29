package com.studytracker.service;

import com.rometools.rome.feed.synd.SyndEntry;
import com.rometools.rome.feed.synd.SyndFeed;
import com.rometools.rome.io.SyndFeedInput;
import com.rometools.rome.io.XmlReader;
import com.studytracker.dto.NewsItem;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Fetches and parses RSS feeds into normalized NewsItem objects.
 * Handles timeouts and parse errors per-source without crashing.
 */
@Slf4j
@Component
public class NewsFetcher {

    private static final int CONNECT_TIMEOUT_MS = 8000;
    private static final int READ_TIMEOUT_MS = 10000;
    private static final String USER_AGENT = "StudyTracker/1.0 (RSS Reader)";

    /**
     * Fetch articles from a single RSS source.
     * Returns empty list on any failure (timeout, parse error, network error).
     */
    public List<NewsItem> fetch(NewsSourceConfig source) {
        List<NewsItem> items = new ArrayList<>();
        try {
            URL feedUrl = URI.create(source.getFeedUrl()).toURL();
            HttpURLConnection conn = (HttpURLConnection) feedUrl.openConnection();
            conn.setConnectTimeout(CONNECT_TIMEOUT_MS);
            conn.setReadTimeout(READ_TIMEOUT_MS);
            conn.setRequestProperty("User-Agent", USER_AGENT);
            conn.setRequestProperty("Accept", "application/rss+xml, application/xml, text/xml, */*");
            conn.setInstanceFollowRedirects(true);

            int status = conn.getResponseCode();
            if (status != 200) {
                log.warn("Source {} returned HTTP {}", source.getId(), status);
                conn.disconnect();
                return items;
            }

            SyndFeedInput input = new SyndFeedInput();
            SyndFeed feed;
            try (XmlReader reader = new XmlReader(conn.getInputStream())) {
                feed = input.build(reader);
            }
            conn.disconnect();

            for (SyndEntry entry : feed.getEntries()) {
                NewsItem item = mapEntry(entry, source);
                if (item != null && item.getTitle() != null && !item.getTitle().isBlank()) {
                    items.add(item);
                }
            }

            log.info("Fetched {} articles from {}", items.size(), source.getId());
        } catch (Exception e) {
            log.error("Failed to fetch source {}: {}", source.getId(), e.getMessage());
        }
        return items;
    }

    private NewsItem mapEntry(SyndEntry entry, NewsSourceConfig source) {
        try {
            String title = entry.getTitle() != null ? entry.getTitle().trim() : null;
            if (title == null || title.isBlank()) return null;

            String summary = null;
            if (entry.getDescription() != null && entry.getDescription().getValue() != null) {
                summary = stripHtml(entry.getDescription().getValue().trim());
                if (summary.length() > 300) {
                    summary = summary.substring(0, 297) + "...";
                }
            }

            String link = entry.getLink() != null ? entry.getLink().trim() : null;

            Instant publishedAt = null;
            if (entry.getPublishedDate() != null) {
                publishedAt = entry.getPublishedDate().toInstant();
            } else if (entry.getUpdatedDate() != null) {
                publishedAt = entry.getUpdatedDate().toInstant();
            }

            // Extract image from enclosures or media content
            String imageUrl = extractImage(entry);

            // Determine category from entry categories or fall back to source default
            String category = determineCategory(entry, source);

            return NewsItem.builder()
                    .id(UUID.nameUUIDFromBytes((source.getId() + ":" + link).getBytes()).toString())
                    .title(title)
                    .summary(summary)
                    .source(source.getId())
                    .sourceName(source.getDisplayName())
                    .url(link)
                    .publishedAt(publishedAt)
                    .category(category)
                    .language(source.getLanguage())
                    .imageUrl(imageUrl)
                    .build();
        } catch (Exception e) {
            log.debug("Failed to map entry from {}: {}", source.getId(), e.getMessage());
            return null;
        }
    }

    private String extractImage(SyndEntry entry) {
        // Try enclosures first (common in RSS 2.0)
        if (entry.getEnclosures() != null && !entry.getEnclosures().isEmpty()) {
            for (var enclosure : entry.getEnclosures()) {
                if (enclosure.getType() != null && enclosure.getType().startsWith("image/")) {
                    return enclosure.getUrl();
                }
            }
        }

        // Try to extract from description HTML
        if (entry.getDescription() != null && entry.getDescription().getValue() != null) {
            String desc = entry.getDescription().getValue();
            int imgStart = desc.indexOf("src=\"");
            if (imgStart > -1) {
                imgStart += 5;
                int imgEnd = desc.indexOf("\"", imgStart);
                if (imgEnd > imgStart) {
                    String url = desc.substring(imgStart, imgEnd);
                    if (url.startsWith("http")) {
                        return url;
                    }
                }
            }
        }
        return null;
    }

    private String determineCategory(SyndEntry entry, NewsSourceConfig source) {
        // Check entry categories first
        if (entry.getCategories() != null && !entry.getCategories().isEmpty()) {
            for (var cat : entry.getCategories()) {
                String catName = cat.getName();
                if (catName != null) {
                    String matched = matchCategory(catName);
                    if (matched != null) return matched;
                }
            }
        }

        // Try keyword matching on title
        String title = entry.getTitle() != null ? entry.getTitle().toLowerCase() : "";
        String matched = matchCategory(title);
        if (matched != null) return matched;

        return source.getDefaultCategory();
    }

    private String matchCategory(String text) {
        if (text == null) return null;
        String lower = text.toLowerCase();

        if (lower.contains("spring boot") || lower.contains("spring framework") || lower.contains("spring cloud")) return "SPRING";
        if (lower.contains("java") || lower.contains("jdk") || lower.contains("jvm") || lower.contains("openjdk")) return "JAVA";
        if (lower.contains("react") || lower.contains("nextjs") || lower.contains("next.js")) return "REACT";
        if (lower.contains("typescript")) return "TYPESCRIPT";
        if (lower.contains("python") || lower.contains("django") || lower.contains("flask")) return "PYTHON";
        if (lower.contains("docker") || lower.contains("container") || lower.contains("kubernetes")) return "DOCKER";
        if (lower.contains("database") || lower.contains("mysql") || lower.contains("postgresql") || lower.contains("sql")) return "DATABASE";
        if (lower.contains("ai") || lower.contains("machine learning") || lower.contains("chatgpt") || lower.contains("llm") || lower.contains("artificial intelligence")) return "AI";
        if (lower.contains("devops") || lower.contains("ci/cd") || lower.contains("jenkins") || lower.contains("github actions")) return "DEVOPS";
        if (lower.contains("cloud") || lower.contains("aws") || lower.contains("azure") || lower.contains("gcp")) return "CLOUD";
        if (lower.contains("security") || lower.contains("cybersecurity") || lower.contains("vulnerability")) return "CYBERSECURITY";
        if (lower.contains("backend") || lower.contains("api") || lower.contains("rest") || lower.contains("microservice")) return "BACKEND";
        if (lower.contains("frontend") || lower.contains("css") || lower.contains("html") || lower.contains("web")) return "WEB_DEVELOPMENT";

        return null;
    }

    private String stripHtml(String html) {
        if (html == null) return null;
        return html.replaceAll("<[^>]*>", "").replaceAll("\\s+", " ").trim();
    }
}
