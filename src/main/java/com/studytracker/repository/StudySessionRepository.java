package com.studytracker.repository;

import com.studytracker.entity.StudySession;
import com.studytracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface StudySessionRepository extends JpaRepository<StudySession, Long> {

    List<StudySession> findByUserAndStatus(User user, StudySession.SessionStatus status);

    List<StudySession> findByUserAndStatusIn(User user, List<StudySession.SessionStatus> statuses);

    @Query("SELECT COALESCE(SUM(s.durationSeconds), 0) FROM StudySession s WHERE s.user = :user AND s.startedAt >= :from AND s.startedAt <= :to")
    Long sumDurationByUserAndDateRange(@Param("user") User user, @Param("from") LocalDateTime from, @Param("to") LocalDateTime to);

    @Query("SELECT COALESCE(SUM(s.durationSeconds), 0) FROM StudySession s WHERE s.user = :user AND s.courseId = :courseId")
    Long sumDurationByUserAndCourse(@Param("user") User user, @Param("courseId") String courseId);
}
