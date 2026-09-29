package com.studytracker.controller;

import com.studytracker.entity.Task;
import com.studytracker.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/debug")
@RequiredArgsConstructor
public class DebugController {
    private final TaskRepository taskRepository;

    @GetMapping("/tasks")
    public List<Task> getRawTasks() {
        return taskRepository.findAll();
    }
}
