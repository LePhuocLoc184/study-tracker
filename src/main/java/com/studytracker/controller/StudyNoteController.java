package com.studytracker.controller;

import com.studytracker.dto.StudyNoteDto;
import com.studytracker.entity.User;
import com.studytracker.service.StudyNoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class StudyNoteController {

    private final StudyNoteService studyNoteService;

    @GetMapping
    public StudyNoteDto getNote(
            @AuthenticationPrincipal User currentUser,
            @RequestParam String courseId,
            @RequestParam Integer dayNumber
    ) {
        return studyNoteService.getNote(currentUser, courseId, dayNumber);
    }

    @PostMapping
    public StudyNoteDto saveNote(
            @AuthenticationPrincipal User currentUser,
            @RequestBody StudyNoteDto request
    ) {
        return studyNoteService.saveNote(currentUser, request);
    }
}
