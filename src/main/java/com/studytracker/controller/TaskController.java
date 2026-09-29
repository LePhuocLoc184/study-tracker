package com.studytracker.controller;

import com.studytracker.dto.InitTasksResponse;
import com.studytracker.dto.ProgressResponse;
import com.studytracker.dto.TaskInitItemRequest;
import com.studytracker.dto.TaskResponse;
import com.studytracker.entity.User;
import com.studytracker.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public List<TaskResponse> getAllTasks() {
        return taskService.getAllTasks();
    }

    @PostMapping("/init")
    public ResponseEntity<InitTasksResponse> initializeTasks(
            @Valid @RequestBody List<TaskInitItemRequest> items
    ) {
        InitTasksResponse response = taskService.initializeTasks(items);
        HttpStatus status = response.getMessage().contains("skipped")
                ? HttpStatus.OK
                : HttpStatus.CREATED;
        return ResponseEntity.status(status).body(response);
    }

    @PatchMapping("/{id}/status")
    public TaskResponse updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> body,
            @AuthenticationPrincipal User currentUser
    ) {
        Boolean completed = body.get("completed");
        if (completed == null) {
            throw new IllegalArgumentException("completed must not be null");
        }
        return taskService.updateStatus(id, currentUser, completed);
    }

    @PatchMapping("/{id}/notes")
    public TaskResponse updateNote(
            @PathVariable Long id,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal User currentUser
    ) {
        String note = body.get("note");
        return taskService.updateNote(id, currentUser, note);
    }

    @GetMapping("/progress")
    public ProgressResponse getProgress(
            @AuthenticationPrincipal User currentUser,
            @RequestParam(defaultValue = "java_backend") String courseId
    ) {
        return taskService.getProgress(currentUser, courseId);
    }
}
