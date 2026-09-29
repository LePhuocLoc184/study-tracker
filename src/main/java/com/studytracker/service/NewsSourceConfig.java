package com.studytracker.service;

import com.studytracker.dto.NewsItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

/**
 * Configuration-driven RSS news source.
 * To add a new source, create a new NewsSourceConfig and register it in NewsAggregatorService.
 */
@Getter
@AllArgsConstructor
@Builder
public class NewsSourceConfig {

    /** Unique identifier, e.g. "VNEXPRESS", "SPRING" */
    private final String id;

    /** Display name, e.g. "VnExpress Công nghệ" */
    private final String displayName;

    /** RSS feed URL */
    private final String feedUrl;

    /** Default language: "vi" or "en" */
    private final String language;

    /** Default category for articles from this source (fallback) */
    private final String defaultCategory;
}
