package com.studytracker.service;

import com.studytracker.dto.InitTasksResponse;
import com.studytracker.dto.NestedTaskInitRequest;
import com.studytracker.dto.ProgressResponse;
import com.studytracker.dto.TaskInitItemRequest;
import com.studytracker.dto.TaskResponse;
import com.studytracker.entity.StudyNote;
import com.studytracker.entity.Task;
import com.studytracker.entity.User;
import com.studytracker.entity.UserTask;
import com.studytracker.exception.TaskNotFoundException;
import com.studytracker.repository.StudyNoteRepository;
import com.studytracker.repository.TaskRepository;
import com.studytracker.repository.UserRepository;
import com.studytracker.repository.UserTaskRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final UserTaskRepository userTaskRepository;
    private final StudyNoteRepository studyNoteRepository;
    private final NotificationService notificationService;

    private static final String USER_A_EMAIL = "loc@gmail.com";
    private static final String USER_B_EMAIL = "hung@gmail.com";

    @Override
    @Transactional(readOnly = true)
    public List<TaskResponse> getAllTasks() {
        // We will default to java_backend for now as it's the only active course.
        String courseId = "java_backend";
        List<Task> tasks = taskRepository.findAllByOrderByDayAscIdAsc();
        // Fallback for DB tasks that were created before course_id was introduced
        tasks = tasks.stream()
                .filter(t -> t.getCourseId() == null || t.getCourseId().equals(courseId))
                .toList();
        
        // Let's get the users to calculate userATasks and userBTasks for legacy payload compatibility
        User userA = userRepository.findByEmail(USER_A_EMAIL).orElse(null);
        User userB = userRepository.findByEmail(USER_B_EMAIL).orElse(null);

        Map<Long, Boolean> userATasks = userA != null ? userTaskRepository.findByUser(userA).stream()
                .collect(Collectors.toMap(ut -> ut.getTask().getId(), UserTask::isCompleted)) : Map.of();
        Map<Long, Boolean> userBTasks = userB != null ? userTaskRepository.findByUser(userB).stream()
                .collect(Collectors.toMap(ut -> ut.getTask().getId(), UserTask::isCompleted)) : Map.of();

        // Note: study notes are now per DAY, not per TASK.
        // We will just attach the day note to the first task of the day, or all tasks of that day.
        // To be safe, we attach to all tasks for backward compatibility of UI, or just return them.
        Map<Integer, String> userANotes = userA != null ? studyNoteRepository.findAll().stream()
                .filter(n -> "java_backend".equals(n.getCourseId()) && n.getUser().getId().equals(userA.getId()))
                .collect(Collectors.toMap(StudyNote::getDayNumber, StudyNote::getContent, (a, b) -> a)) : Map.of();
        Map<Integer, String> userBNotes = userB != null ? studyNoteRepository.findAll().stream()
                .filter(n -> "java_backend".equals(n.getCourseId()) && n.getUser().getId().equals(userB.getId()))
                .collect(Collectors.toMap(StudyNote::getDayNumber, StudyNote::getContent, (a, b) -> a)) : Map.of();

        return tasks.stream().map(task -> {
            boolean aCompleted = userATasks.getOrDefault(task.getId(), false);
            boolean bCompleted = userBTasks.getOrDefault(task.getId(), false);
            String aNote = userANotes.get(task.getDay());
            String bNote = userBNotes.get(task.getDay());

            return TaskResponse.builder()
                    .id(task.getId())
                    .day(task.getDay())
                    .phase(task.getPhase())
                    .topic(task.getTopic())
                    .title(task.getTitle())
                    .userACompleted(aCompleted)
                    .userBCompleted(bCompleted)
                    .userANote(aNote)
                    .userBNote(bNote)
                    .build();
        }).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public TaskResponse getTaskById(Long id) {
        Task task = findTask(id);
        return getAllTasks().stream().filter(t -> t.getId().equals(id)).findFirst().orElseThrow();
    }

    @Override
    @Transactional
    public InitTasksResponse initializeTasks(List<TaskInitItemRequest> items) {
        long existing = taskRepository.count();
        if (existing > 0) {
            return InitTasksResponse.builder().message("Tasks already exist. Initialization skipped.").count(existing).build();
        }

        List<Task> tasks = flattenInitItems(items);
        List<Task> saved = taskRepository.saveAll(tasks);
        return InitTasksResponse.builder().message("Tasks initialized successfully").count(saved.size()).build();
    }

    @Override
    @Transactional
    public TaskResponse updateStatus(Long id, User currentUser, boolean completed) {
        Task task = findTask(id);
        
        // Get progress BEFORE update
        ProgressResponse oldProgress = getProgress(currentUser, "java_backend");
        boolean wasBehind = oldProgress.getCurrentUser().getCompleted() < oldProgress.getOtherUser().getCompleted();
        
        UserTask userTask = userTaskRepository.findByUserAndTask(currentUser, task)
                .orElse(UserTask.builder().user(currentUser).task(task).build());
        userTask.setCompleted(completed);
        userTaskRepository.save(userTask);
        
        if (completed) {
            // Find partner
            User otherUser = userRepository.findAll().stream()
                    .filter(u -> !u.getId().equals(currentUser.getId()))
                    .findFirst().orElse(null);
                    
            if (otherUser != null) {
                // Send basic completion notification
                notificationService.createAndSendNotification(
                        otherUser,
                        "TASK_COMPLETED",
                        "🔥 " + currentUser.getName() + " completed a task",
                        currentUser.getName() + " has completed: " + task.getTitle()
                );
                
                // Check if overtaken
                ProgressResponse newProgress = getProgress(currentUser, "java_backend");
                boolean isAheadNow = newProgress.getCurrentUser().getCompleted() > newProgress.getOtherUser().getCompleted();
                if (wasBehind && isAheadNow) {
                    notificationService.createAndSendNotification(
                            otherUser,
                            "RANK_CHANGE",
                            "⚠️ " + currentUser.getName() + " overtook you!",
                            currentUser.getName() + " has completed more tasks than you. Time to catch up!"
                    );
                }
                
                // Check if Day is completed (all tasks in day completed by current user, AND note >= 30)
                List<Task> dayTasks = taskRepository.findAllByOrderByDayAscIdAsc().stream()
                        .filter(t -> t.getDay().equals(task.getDay()) && (t.getCourseId() == null || t.getCourseId().equals("java_backend")))
                        .toList();
                
                long completedInDay = userTaskRepository.findByUser(currentUser).stream()
                        .filter(ut -> ut.isCompleted() && dayTasks.stream().anyMatch(dt -> dt.getId().equals(ut.getTask().getId())))
                        .count();
                        
                if (completedInDay == dayTasks.size()) {
                    String note = studyNoteRepository.findByUserAndCourseIdAndDayNumber(currentUser, "java_backend", task.getDay())
                            .map(StudyNote::getContent).orElse("");
                    if (note.length() >= 30) {
                        notificationService.createAndSendNotification(
                                otherUser,
                                "DAY_COMPLETED",
                                "📚 " + currentUser.getName() + " completed Day " + task.getDay(),
                                currentUser.getName() + " finished all tasks and notes for Day " + task.getDay() + "!"
                        );
                    }
                }
            }
        }
        
        return getTaskById(id);
    }

    @Override
    @Transactional
    public TaskResponse updateNote(Long id, User currentUser, String note) {
        Task task = findTask(id);
        String normalizedNote = normalizeNote(note);
        String cId = task.getCourseId() != null ? task.getCourseId() : "java_backend";
        
        StudyNote studyNote = studyNoteRepository.findByUserAndCourseIdAndDayNumber(currentUser, cId, task.getDay())
                .orElse(StudyNote.builder().user(currentUser).courseId(cId).dayNumber(task.getDay()).build());
        
        studyNote.setContent(normalizedNote);
        studyNoteRepository.save(studyNote);
        
        // Find partner
        User otherUser = userRepository.findAll().stream()
                .filter(u -> !u.getId().equals(currentUser.getId()))
                .findFirst().orElse(null);
                
        if (otherUser != null && normalizedNote != null && normalizedNote.length() >= 30) {
            List<Task> dayTasks = taskRepository.findAllByOrderByDayAscIdAsc().stream()
                    .filter(t -> t.getDay().equals(task.getDay()) && (t.getCourseId() == null || t.getCourseId().equals(cId)))
                    .toList();
            
            long completedInDay = userTaskRepository.findByUser(currentUser).stream()
                    .filter(ut -> ut.isCompleted() && dayTasks.stream().anyMatch(dt -> dt.getId().equals(ut.getTask().getId())))
                    .count();
                    
            if (completedInDay == dayTasks.size() && dayTasks.size() > 0) {
                notificationService.createAndSendNotification(
                        otherUser,
                        "DAY_COMPLETED",
                        "📚 " + currentUser.getName() + " completed Day " + task.getDay(),
                        currentUser.getName() + " finished all tasks and notes for Day " + task.getDay() + "!"
                );
            }
        }
        
        return getTaskById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public ProgressResponse getProgress(User currentUser, String courseId) {
        List<Task> tasks = taskRepository.findAllByOrderByDayAscIdAsc().stream()
                .filter(t -> t.getCourseId() == null || t.getCourseId().equals(courseId))
                .toList();
        long totalTasks = tasks.size();
        
        long myCompleted = userTaskRepository.findByUser(currentUser).stream()
                .filter(ut -> ut.isCompleted() && (ut.getTask().getCourseId() == null || ut.getTask().getCourseId().equals(courseId)))
                .count();
        
        // Dynamically find the "partner". In a 2-user system, it's just the other user.
        User otherUser = userRepository.findAll().stream()
                .filter(u -> !u.getId().equals(currentUser.getId()))
                .findFirst().orElse(null);
        
        long otherCompleted = otherUser != null ? userTaskRepository.findByUser(otherUser).stream()
                .filter(ut -> ut.isCompleted() && (ut.getTask().getCourseId() == null || ut.getTask().getCourseId().equals(courseId)))
                .count() : 0;
        String otherName = otherUser != null ? otherUser.getName() : "Study Partner";

        return ProgressResponse.builder()
                .totalTasks(totalTasks)
                .currentUser(ProgressResponse.UserProgress.builder()
                        .completed(myCompleted)
                        .progress(percent(myCompleted, totalTasks))
                        .build())
                .otherUser(ProgressResponse.UserProgress.builder()
                        .completed(otherCompleted)
                        .progress(percent(otherCompleted, totalTasks))
                        .build())
                .currentUserName(currentUser.getName())
                .otherUserName(otherName)
                .totalCompleted(myCompleted + otherCompleted)
                .build();
    }

    private Task findTask(Long id) {
        return taskRepository.findById(id).orElseThrow(() -> new TaskNotFoundException(id));
    }

    private List<Task> flattenInitItems(List<TaskInitItemRequest> items) {
        List<Task> result = new ArrayList<>();
        for (TaskInitItemRequest item : items) {
            if (item.isGrouped()) {
                for (NestedTaskInitRequest nested : item.getTasks()) {
                    result.add(fromNested(item, nested));
                }
            } else {
                result.add(fromFlat(item));
            }
        }
        return result;
    }

    private Task fromFlat(TaskInitItemRequest item) {
        return Task.builder()
                .day(item.getDay())
                .phase(item.getPhase())
                .topic(item.getTopic())
                .title(item.getTitle())
                .courseId("java_backend")
                .build();
    }

    private Task fromNested(TaskInitItemRequest group, NestedTaskInitRequest nested) {
        return Task.builder()
                .day(group.getDay())
                .phase(group.getPhase())
                .topic(group.getTopic())
                .title(nested.getTitle())
                .courseId("java_backend")
                .build();
    }

    private String normalizeNote(String note) {
        if (note == null) return null;
        String trimmed = note.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }

    private double percent(long completed, long total) {
        if (total == 0) return 0.0;
        return BigDecimal.valueOf(completed * 100.0 / total)
                .setScale(1, RoundingMode.HALF_UP)
                .doubleValue();
    }
}
