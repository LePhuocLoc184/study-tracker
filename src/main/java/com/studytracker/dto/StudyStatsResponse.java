package com.studytracker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudyStatsResponse {
    private Long todayDurationSeconds;
    private Long thisWeekDurationSeconds;
    private Long courseDurationSeconds;
}
