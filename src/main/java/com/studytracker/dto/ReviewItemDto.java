package com.studytracker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewItemDto {
    private String courseId;
    private Integer dayNumber;
    private StudyNoteDto note;
    private LocalDateTime lastReviewedAt;
    private Integer reviewCount;
}
