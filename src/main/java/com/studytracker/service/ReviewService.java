package com.studytracker.service;

import com.studytracker.dto.ReviewItemDto;
import com.studytracker.dto.StudyNoteDto;
import com.studytracker.entity.ReviewRecord;
import com.studytracker.entity.StudyNote;
import com.studytracker.entity.User;
import com.studytracker.repository.ReviewRecordRepository;
import com.studytracker.repository.StudyNoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRecordRepository reviewRecordRepository;
    private final StudyNoteRepository studyNoteRepository;
    private final StudyNoteService studyNoteService; // For DTO mapping

    @Transactional(readOnly = true)
    public List<ReviewItemDto> getPendingReviews(User user, String courseId) {
        // Fetch all notes for the user and course that might need review.
        // For now, return all notes that exist, sorted by some logic (e.g., oldest reviewed first).
        // Since we don't have a complex spaced repetition, we'll just return all notes for the user.
        List<StudyNote> notes = studyNoteRepository.findAll().stream()
                .filter(n -> n.getUser().getId().equals(user.getId()) && n.getCourseId().equals(courseId))
                .toList();

        return notes.stream().map(note -> {
            ReviewRecord record = reviewRecordRepository.findByUserAndCourseIdAndDayNumber(user, courseId, note.getDayNumber())
                    .orElse(ReviewRecord.builder()
                            .user(user)
                            .courseId(courseId)
                            .dayNumber(note.getDayNumber())
                            .reviewCount(0)
                            .build());

            return ReviewItemDto.builder()
                    .courseId(courseId)
                    .dayNumber(note.getDayNumber())
                    .note(mapNoteToDto(note))
                    .lastReviewedAt(record.getLastReviewedAt())
                    .reviewCount(record.getReviewCount())
                    .build();
        }).collect(Collectors.toList());
    }

    @Transactional
    public void markAsReviewed(User user, String courseId, Integer dayNumber) {
        ReviewRecord record = reviewRecordRepository.findByUserAndCourseIdAndDayNumber(user, courseId, dayNumber)
                .orElse(ReviewRecord.builder()
                        .user(user)
                        .courseId(courseId)
                        .dayNumber(dayNumber)
                        .reviewCount(0)
                        .build());

        record.setLastReviewedAt(LocalDateTime.now());
        record.setReviewCount(record.getReviewCount() + 1);
        reviewRecordRepository.save(record);
    }

    private StudyNoteDto mapNoteToDto(StudyNote note) {
        return StudyNoteDto.builder()
                .id(note.getId())
                .courseId(note.getCourseId())
                .dayNumber(note.getDayNumber())
                .content(note.getContent())
                .learnedContent(note.getLearnedContent())
                .keyConcepts(note.getKeyConcepts())
                .difficultParts(note.getDifficultParts())
                .reviewItems(note.getReviewItems())
                .build();
    }
}
