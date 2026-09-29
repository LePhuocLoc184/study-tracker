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
public class StudySessionResponse {
    private Long id;
    private String courseId;
    private Integer dayNumber;
    private LocalDateTime startedAt;
    private LocalDateTime pausedAt;
    private LocalDateTime endedAt;
    private Long durationSeconds;
    private String status;
}
