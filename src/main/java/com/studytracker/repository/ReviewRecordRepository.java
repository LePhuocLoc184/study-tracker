package com.studytracker.repository;

import com.studytracker.entity.ReviewRecord;
import com.studytracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewRecordRepository extends JpaRepository<ReviewRecord, Long> {
    Optional<ReviewRecord> findByUserAndCourseIdAndDayNumber(User user, String courseId, Integer dayNumber);
}
