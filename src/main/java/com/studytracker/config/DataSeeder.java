package com.studytracker.config;

import com.studytracker.entity.Course;
import com.studytracker.entity.StudyNote;
import com.studytracker.entity.Task;
import com.studytracker.entity.User;
import com.studytracker.entity.UserTask;
import com.studytracker.repository.CourseRepository;
import com.studytracker.repository.StudyNoteRepository;
import com.studytracker.repository.TaskRepository;
import com.studytracker.repository.UserRepository;
import com.studytracker.repository.UserTaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    @Value("${app.seed.password:123}")
    private String userASeedPassword;

    @Value("${app.seed.password:123}")
    private String userBSeedPassword;

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final TaskRepository taskRepository;
    private final UserTaskRepository userTaskRepository;
    private final StudyNoteRepository studyNoteRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        User userA = migrateOrCreateUser("loc@example.com", "loc@gmail.com", "Lộc", userASeedPassword);
        User userB = migrateOrCreateUser("ban@example.com", "hung@gmail.com", "Hưng", userBSeedPassword);

        seedCourses();
        migrateTasks(userA, userB);
    }

    private User migrateOrCreateUser(String oldEmail, String newEmail, String newName, String rawPassword) {
        User user = userRepository.findByEmail(oldEmail)
                .orElse(userRepository.findByEmail(newEmail).orElse(null));

        if (user == null) {
            user = User.builder()
                    .name(newName)
                    .email(newEmail)
                    .password(passwordEncoder.encode(rawPassword))
                    .role("STUDENT")
                    .build();
            log.info("Created default user: {}", newEmail);
        } else {
            user.setName(newName);
            user.setEmail(newEmail);
            user.setPassword(passwordEncoder.encode(rawPassword));
            log.info("Updated/Migrated user: {}", newEmail);
        }
        return userRepository.save(user);
    }

    private void seedCourses() {
        if (!courseRepository.existsById("java_backend")) {
            courseRepository.save(Course.builder().id("java_backend").name("Java Backend").status("ACTIVE").build());
            courseRepository.save(Course.builder().id("react").name("React").status("COMING_SOON").build());
            courseRepository.save(Course.builder().id("typescript").name("TypeScript").status("COMING_SOON").build());
            courseRepository.save(Course.builder().id("python").name("Python").status("COMING_SOON").build());
            courseRepository.save(Course.builder().id("database").name("Database").status("COMING_SOON").build());
            courseRepository.save(Course.builder().id("docker").name("Docker").status("COMING_SOON").build());
            courseRepository.save(Course.builder().id("english").name("English").status("COMING_SOON").build());
            log.info("Seeded default courses");
        }
    }

    private void migrateTasks(User userA, User userB) {
        // Only run migration if there are tasks but NO UserTasks
        if (taskRepository.count() > 0 && userTaskRepository.count() == 0) {
            log.info("Starting data migration to new schema...");
            List<Task> allTasks = taskRepository.findAll();
            for (Task task : allTasks) {
                // Migrate UserTask
                if (task.isUserACompleted()) {
                    userTaskRepository.save(UserTask.builder().user(userA).task(task).completed(true).build());
                }
                if (task.isUserBCompleted()) {
                    userTaskRepository.save(UserTask.builder().user(userB).task(task).completed(true).build());
                }

                // Migrate Notes -> Combine task notes into Day note
                migrateNote(userA, task, task.getUserANote());
                migrateNote(userB, task, task.getUserBNote());
            }
            log.info("Data migration completed successfully.");
        }
    }

    private void migrateNote(User user, Task task, String taskNote) {
        if (taskNote != null && !taskNote.trim().isEmpty()) {
            String cId = task.getCourseId() != null ? task.getCourseId() : "java_backend";
            StudyNote existingNote = studyNoteRepository
                    .findByUserAndCourseIdAndDayNumber(user, cId, task.getDay())
                    .orElse(null);
            
            if (existingNote == null) {
                existingNote = StudyNote.builder()
                        .user(user)
                        .courseId(cId)
                        .dayNumber(task.getDay())
                        .content(task.getTitle() + ": " + taskNote)
                        .build();
            } else {
                existingNote.setContent(existingNote.getContent() + "\n\n" + task.getTitle() + ": " + taskNote);
            }
            studyNoteRepository.save(existingNote);
        }
    }
}
