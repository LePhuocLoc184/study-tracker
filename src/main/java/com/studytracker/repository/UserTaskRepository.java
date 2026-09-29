package com.studytracker.repository;

import com.studytracker.entity.UserTask;
import com.studytracker.entity.User;
import com.studytracker.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserTaskRepository extends JpaRepository<UserTask, Long> {
    Optional<UserTask> findByUserAndTask(User user, Task task);
    List<UserTask> findByUser(User user);
    long countByUserAndCompletedTrue(User user);
    long countByUserAndCompletedTrueAndTask_CourseId(User user, String courseId);
}
