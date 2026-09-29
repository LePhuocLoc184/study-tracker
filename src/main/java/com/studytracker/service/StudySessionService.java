package com.studytracker.service;

import com.studytracker.dto.StudySessionRequest;
import com.studytracker.dto.StudySessionResponse;
import com.studytracker.dto.StudyStatsResponse;
import com.studytracker.entity.StudySession;
import com.studytracker.entity.User;
import com.studytracker.repository.StudySessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.DayOfWeek;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudySessionService {

    private final StudySessionRepository studySessionRepository;

    @Transactional
    public StudySessionResponse startSession(User user, StudySessionRequest request) {
        // Check if there is an active/paused session
        List<StudySession> activeSessions = studySessionRepository.findByUserAndStatusIn(
                user, List.of(StudySession.SessionStatus.ACTIVE, StudySession.SessionStatus.PAUSED));

        if (!activeSessions.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User already has an active or paused session");
        }

        StudySession session = StudySession.builder()
                .user(user)
                .courseId(request.getCourseId())
                .dayNumber(request.getDayNumber())
                .startedAt(LocalDateTime.now())
                .durationSeconds(0L)
                .status(StudySession.SessionStatus.ACTIVE)
                .build();

        return mapToResponse(studySessionRepository.save(session));
    }

    @Transactional
    public StudySessionResponse pauseSession(User user, Long id) {
        StudySession session = getSession(user, id);

        if (session.getStatus() != StudySession.SessionStatus.ACTIVE) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Session is not active");
        }

        LocalDateTime now = LocalDateTime.now();
        long duration = Duration.between(session.getStartedAt(), now).getSeconds();
        session.setDurationSeconds(session.getDurationSeconds() + duration);
        session.setPausedAt(now);
        session.setStatus(StudySession.SessionStatus.PAUSED);

        return mapToResponse(studySessionRepository.save(session));
    }

    @Transactional
    public StudySessionResponse resumeSession(User user, Long id) {
        StudySession session = getSession(user, id);

        if (session.getStatus() != StudySession.SessionStatus.PAUSED) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Session is not paused");
        }

        session.setStartedAt(LocalDateTime.now());
        session.setPausedAt(null);
        session.setStatus(StudySession.SessionStatus.ACTIVE);

        return mapToResponse(studySessionRepository.save(session));
    }

    @Transactional
    public StudySessionResponse finishSession(User user, Long id) {
        StudySession session = getSession(user, id);

        if (session.getStatus() == StudySession.SessionStatus.COMPLETED) {
            return mapToResponse(session);
        }

        LocalDateTime now = LocalDateTime.now();
        if (session.getStatus() == StudySession.SessionStatus.ACTIVE) {
            long duration = Duration.between(session.getStartedAt(), now).getSeconds();
            session.setDurationSeconds(session.getDurationSeconds() + duration);
        }

        session.setEndedAt(now);
        session.setStatus(StudySession.SessionStatus.COMPLETED);

        return mapToResponse(studySessionRepository.save(session));
    }

    @Transactional(readOnly = true)
    public StudySessionResponse getActiveSession(User user) {
        List<StudySession> activeSessions = studySessionRepository.findByUserAndStatusIn(
                user, List.of(StudySession.SessionStatus.ACTIVE, StudySession.SessionStatus.PAUSED));

        if (activeSessions.isEmpty()) {
            return null; // Return empty response (204 No Content typically handled by controller)
        }

        return mapToResponse(activeSessions.get(0));
    }

    @Transactional(readOnly = true)
    public StudyStatsResponse getStats(User user, String courseId) {
        LocalDateTime todayStart = LocalDate.now().atStartOfDay();
        LocalDateTime todayEnd = todayStart.plusDays(1).minusSeconds(1);

        LocalDateTime weekStart = LocalDate.now().with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY)).atStartOfDay();
        LocalDateTime weekEnd = weekStart.plusDays(7).minusSeconds(1);

        Long todayDuration = studySessionRepository.sumDurationByUserAndDateRange(user, todayStart, todayEnd);
        Long weekDuration = studySessionRepository.sumDurationByUserAndDateRange(user, weekStart, weekEnd);
        Long courseDuration = courseId != null ? studySessionRepository.sumDurationByUserAndCourse(user, courseId) : 0L;

        // Also add duration from active session to today/week/course stats
        List<StudySession> activeSessions = studySessionRepository.findByUserAndStatusIn(
                user, List.of(StudySession.SessionStatus.ACTIVE, StudySession.SessionStatus.PAUSED));

        if (!activeSessions.isEmpty()) {
            StudySession active = activeSessions.get(0);
            long activeDuration = active.getDurationSeconds();
            if (active.getStatus() == StudySession.SessionStatus.ACTIVE) {
                activeDuration += Duration.between(active.getStartedAt(), LocalDateTime.now()).getSeconds();
            }
            
            // Only add if it started today/this week
            if (active.getStartedAt().isAfter(todayStart)) todayDuration += activeDuration;
            if (active.getStartedAt().isAfter(weekStart)) weekDuration += activeDuration;
            if (courseId != null && courseId.equals(active.getCourseId())) courseDuration += activeDuration;
        }

        return StudyStatsResponse.builder()
                .todayDurationSeconds(todayDuration != null ? todayDuration : 0L)
                .thisWeekDurationSeconds(weekDuration != null ? weekDuration : 0L)
                .courseDurationSeconds(courseDuration != null ? courseDuration : 0L)
                .build();
    }

    private StudySession getSession(User user, Long id) {
        StudySession session = studySessionRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Session not found"));

        if (!session.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }

        return session;
    }

    private StudySessionResponse mapToResponse(StudySession session) {
        // Calculate real-time duration for active sessions
        long currentDuration = session.getDurationSeconds() != null ? session.getDurationSeconds() : 0L;
        if (session.getStatus() == StudySession.SessionStatus.ACTIVE && session.getStartedAt() != null) {
            currentDuration += Duration.between(session.getStartedAt(), LocalDateTime.now()).getSeconds();
        }

        return StudySessionResponse.builder()
                .id(session.getId())
                .courseId(session.getCourseId())
                .dayNumber(session.getDayNumber())
                .startedAt(session.getStartedAt())
                .pausedAt(session.getPausedAt())
                .endedAt(session.getEndedAt())
                .durationSeconds(currentDuration)
                .status(session.getStatus().name())
                .build();
    }
}
