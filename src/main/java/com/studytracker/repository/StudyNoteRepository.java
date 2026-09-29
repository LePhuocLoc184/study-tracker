package com.studytracker.repository;

import com.studytracker.entity.StudyNote;
import com.studytracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudyNoteRepository extends JpaRepository<StudyNote, Long> {
    Optional<StudyNote> findByUserAndCourseIdAndDayNumber(User user, String courseId, Integer dayNumber);
    List<StudyNote> findByCourseIdAndDayNumber(String courseId, Integer dayNumber);
    long countByUserAndCourseId(User user, String courseId);
}
