package com.studytracker.service;

import com.studytracker.dto.StudyNoteDto;
import com.studytracker.entity.StudyNote;
import com.studytracker.entity.User;
import com.studytracker.repository.StudyNoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class StudyNoteService {

    private final StudyNoteRepository studyNoteRepository;

    @Transactional(readOnly = true)
    public StudyNoteDto getNote(User user, String courseId, Integer dayNumber) {
        return studyNoteRepository.findByUserAndCourseIdAndDayNumber(user, courseId, dayNumber)
                .map(this::mapToDto)
                .orElse(StudyNoteDto.builder()
                        .courseId(courseId)
                        .dayNumber(dayNumber)
                        .build());
    }

    @Transactional
    public StudyNoteDto saveNote(User user, StudyNoteDto request) {
        StudyNote note = studyNoteRepository.findByUserAndCourseIdAndDayNumber(user, request.getCourseId(), request.getDayNumber())
                .orElse(StudyNote.builder()
                        .user(user)
                        .courseId(request.getCourseId())
                        .dayNumber(request.getDayNumber())
                        .build());

        note.setContent(request.getContent());
        note.setLearnedContent(request.getLearnedContent());
        note.setKeyConcepts(request.getKeyConcepts());
        note.setDifficultParts(request.getDifficultParts());
        note.setReviewItems(request.getReviewItems());
        note.setUpdatedAt(LocalDateTime.now());

        return mapToDto(studyNoteRepository.save(note));
    }

    private StudyNoteDto mapToDto(StudyNote note) {
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
