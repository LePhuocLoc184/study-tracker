package com.studytracker.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewsItem {

    private String id;

    private String title;

    private String summary;

    private String source;

    @JsonProperty("source_name")
    private String sourceName;

    private String url;

    @JsonProperty("published_at")
    private Instant publishedAt;

    private String category;

    private String language;

    @JsonProperty("image_url")
    private String imageUrl;
}
