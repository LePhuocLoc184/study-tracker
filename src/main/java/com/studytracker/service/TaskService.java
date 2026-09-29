package com.studytracker.service;

import com.studytracker.dto.InitTasksResponse;
import com.studytracker.dto.ProgressResponse;
import com.studytracker.dto.TaskInitItemRequest;
import com.studytracker.dto.TaskResponse;
import com.studytracker.entity.User;

import java.util.List;

public interface TaskService {

    List<TaskResponse> getAllTasks();

    TaskResponse getTaskById(Long id);

    InitTasksResponse initializeTasks(List<TaskInitItemRequest> items);

    TaskResponse updateStatus(Long id, User currentUser, boolean completed);

    TaskResponse updateNote(Long id, User currentUser, String note);

    ProgressResponse getProgress(User currentUser, String courseId);
}
