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
public class StudyNoteDto {
    private Long id;
    private String courseId;
    private Integer dayNumber;
    private String content; // legacy
    private String learnedContent;
    private String keyConcepts;
    private String difficultParts;
    private String reviewItems;
}
