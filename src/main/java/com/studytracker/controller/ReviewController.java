package com.studytracker.controller;

import com.studytracker.dto.ReviewItemDto;
import com.studytracker.entity.User;
import com.studytracker.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping
    public List<ReviewItemDto> getPendingReviews(
            @AuthenticationPrincipal User currentUser,
            @RequestParam(defaultValue = "java_backend") String courseId
    ) {
        return reviewService.getPendingReviews(currentUser, courseId);
    }

    @PostMapping("/{courseId}/{dayNumber}/mark")
    public ResponseEntity<Void> markAsReviewed(
            @AuthenticationPrincipal User currentUser,
            @PathVariable String courseId,
            @PathVariable Integer dayNumber
    ) {
        reviewService.markAsReviewed(currentUser, courseId, dayNumber);
        return ResponseEntity.ok().build();
    }
}
