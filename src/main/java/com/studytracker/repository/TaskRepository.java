package com.studytracker.repository;

import com.studytracker.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findAllByOrderByDayAscIdAsc();

    List<Task> findAllByCourseIdOrderByDayAscIdAsc(String courseId);

    long countByCourseId(String courseId);
}
