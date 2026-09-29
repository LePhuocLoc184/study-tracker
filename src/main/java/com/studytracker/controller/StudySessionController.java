package com.studytracker.controller;

import com.studytracker.dto.StudySessionRequest;
import com.studytracker.dto.StudySessionResponse;
import com.studytracker.dto.StudyStatsResponse;
import com.studytracker.entity.User;
import com.studytracker.service.StudySessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/study-sessions")
@RequiredArgsConstructor
public class StudySessionController {

    private final StudySessionService studySessionService;

    @PostMapping("/start")
    public StudySessionResponse startSession(
            @AuthenticationPrincipal User currentUser,
            @RequestBody StudySessionRequest request
    ) {
        return studySessionService.startSession(currentUser, request);
    }

    @PostMapping("/{id}/pause")
    public StudySessionResponse pauseSession(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long id
    ) {
        return studySessionService.pauseSession(currentUser, id);
    }

    @PostMapping("/{id}/resume")
    public StudySessionResponse resumeSession(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long id
    ) {
        return studySessionService.resumeSession(currentUser, id);
    }

    @PostMapping("/{id}/finish")
    public StudySessionResponse finishSession(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long id
    ) {
        return studySessionService.finishSession(currentUser, id);
    }

    @GetMapping("/active")
    public ResponseEntity<StudySessionResponse> getActiveSession(
            @AuthenticationPrincipal User currentUser
    ) {
        StudySessionResponse response = studySessionService.getActiveSession(currentUser);
        if (response == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/stats")
    public StudyStatsResponse getStats(
            @AuthenticationPrincipal User currentUser,
            @RequestParam(required = false) String courseId
    ) {
        return studySessionService.getStats(currentUser, courseId);
    }
}
