package com.studytracker.controller;

import com.studytracker.dto.NewsResponse;
import com.studytracker.service.NewsAggregatorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
public class NewsController {

    private final NewsAggregatorService newsAggregatorService;

    @GetMapping
    public NewsResponse getNews(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String language,
            @RequestParam(required = false) String source,
            @RequestParam(defaultValue = "30") int limit
    ) {
        return newsAggregatorService.getNews(category, language, source, limit);
    }
}
