package com.studytracker.controller;

import com.studytracker.entity.User;
import com.studytracker.repository.TaskRepository;
import com.studytracker.repository.UserRepository;
import com.studytracker.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.closeTo;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.nullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    private String tokenA;
    private String tokenB;

    private static final String FLAT_INIT_PAYLOAD = """
            [
              {
                "day": 1,
                "phase": "Phase 1",
                "topic": "Java",
                "title": "Learn Variables",
                "user_a_completed": false,
                "user_b_completed": false,
                "user_a_note": null,
                "user_b_note": null
              },
              {
                "day": 1,
                "phase": "Phase 1",
                "topic": "Java",
                "title": "Learn Data Types",
                "user_a_completed": false,
                "user_b_completed": false,
                "user_a_note": null,
                "user_b_note": null
              }
            ]
            """;

    private static final String GROUPED_INIT_PAYLOAD = """
            [
              {
                "day": 2,
                "phase": "Java Core",
                "topic": "OOP",
                "tasks": [
                  {
                    "id": "day_2_task_1",
                    "title": "4 tinh chat OOP",
                    "completed_by": { "user_a": false, "user_b": false },
                    "notes": { "user_a": "", "user_b": "" }
                  }
                ]
              }
            ]
            """;

    @Autowired
    private com.studytracker.repository.UserTaskRepository userTaskRepository;

    @Autowired
    private com.studytracker.repository.StudyNoteRepository studyNoteRepository;

    @Autowired
    private com.studytracker.repository.StudySessionRepository studySessionRepository;

    @Autowired
    private com.studytracker.repository.NotificationRepository notificationRepository;

    @BeforeEach
    void setup() {
        notificationRepository.deleteAll();
        studySessionRepository.deleteAll();
        studyNoteRepository.deleteAll();
        userTaskRepository.deleteAll();
        taskRepository.deleteAll();
        userRepository.deleteAll();

        User userA = userRepository.save(User.builder()
                .name("Lộc")
                .email("loc@gmail.com")
                .password(passwordEncoder.encode("123"))
                .role("STUDENT")
                .build());

        User userB = userRepository.save(User.builder()
                .name("Hưng")
                .email("hung@gmail.com")
                .password(passwordEncoder.encode("123"))
                .role("STUDENT")
                .build());

        tokenA = jwtService.generateToken(userA);
        tokenB = jwtService.generateToken(userB);
    }

    @Test
    void getAllTasksWhenEmptyReturnsEmptyArray() throws Exception {
        mockMvc.perform(get("/api/tasks")
                        .header("Authorization", "Bearer " + tokenA))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    void unauthenticatedRequestReturns401() throws Exception {
        mockMvc.perform(get("/api/tasks"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void progressWhenEmptyIsZero() throws Exception {
        mockMvc.perform(get("/api/tasks/progress")
                        .header("Authorization", "Bearer " + tokenA))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.total_tasks", is(0)))
                .andExpect(jsonPath("$.current_user.completed", is(0)))
                .andExpect(jsonPath("$.current_user.progress", is(0.0)));
    }

    @Test
    void initFlatTasksThenListSortedByDayAndId() throws Exception {
        mockMvc.perform(post("/api/tasks/init")
                        .header("Authorization", "Bearer " + tokenA)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(FLAT_INIT_PAYLOAD))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.message", is("Tasks initialized successfully")))
                .andExpect(jsonPath("$.count", is(2)));

        mockMvc.perform(get("/api/tasks")
                        .header("Authorization", "Bearer " + tokenA))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].title", is("Learn Variables")))
                .andExpect(jsonPath("$[0].user_a_completed", is(false)))
                .andExpect(jsonPath("$[1].title", is("Learn Data Types")));
    }

    @Test
    void initAcceptsGroupedTasksJsonShape() throws Exception {
        mockMvc.perform(post("/api/tasks/init")
                        .header("Authorization", "Bearer " + tokenA)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(GROUPED_INIT_PAYLOAD))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.count", is(1)));

        mockMvc.perform(get("/api/tasks")
                        .header("Authorization", "Bearer " + tokenA))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].day", is(2)))
                .andExpect(jsonPath("$[0].phase", is("Java Core")))
                .andExpect(jsonPath("$[0].topic", is("OOP")))
                .andExpect(jsonPath("$[0].title", is("4 tinh chat OOP")))
                .andExpect(jsonPath("$[0].user_a_note").value(nullValue()));
    }

    @Test
    void duplicateInitDoesNotDuplicateData() throws Exception {
        mockMvc.perform(post("/api/tasks/init")
                        .header("Authorization", "Bearer " + tokenA)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(FLAT_INIT_PAYLOAD))
                .andExpect(status().isCreated());

        mockMvc.perform(post("/api/tasks/init")
                        .header("Authorization", "Bearer " + tokenA)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(FLAT_INIT_PAYLOAD))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message", is("Tasks already exist. Initialization skipped.")))
                .andExpect(jsonPath("$.count", is(2)));

        mockMvc.perform(get("/api/tasks")
                        .header("Authorization", "Bearer " + tokenA))
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    void updateStatusChangesOnlyAuthenticatedUser() throws Exception {
        seedTwoTasks();
        Long firstId = taskRepository.findAllByOrderByDayAscIdAsc().get(0).getId();

        // User A marks as completed
        mockMvc.perform(patch("/api/tasks/" + firstId + "/status")
                        .header("Authorization", "Bearer " + tokenA)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "completed": true }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user_a_completed", is(true)))
                .andExpect(jsonPath("$.user_b_completed", is(false)));

        // User B marks as completed
        mockMvc.perform(patch("/api/tasks/" + firstId + "/status")
                        .header("Authorization", "Bearer " + tokenB)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "completed": true }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user_a_completed", is(true)))
                .andExpect(jsonPath("$.user_b_completed", is(true)));
    }

    @Test
    void updateNoteChangesOnlyAuthenticatedUser() throws Exception {
        seedTwoTasks();
        Long firstId = taskRepository.findAllByOrderByDayAscIdAsc().get(0).getId();

        mockMvc.perform(patch("/api/tasks/" + firstId + "/notes")
                        .header("Authorization", "Bearer " + tokenA)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "note": "Today I learned Java Generics" }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user_a_note", is("Today I learned Java Generics")))
                .andExpect(jsonPath("$.user_b_note").value(nullValue()));

        mockMvc.perform(patch("/api/tasks/" + firstId + "/notes")
                        .header("Authorization", "Bearer " + tokenB)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "note": "Need to review this again" }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user_a_note", is("Today I learned Java Generics")))
                .andExpect(jsonPath("$.user_b_note", is("Need to review this again")));
    }

    @Test
    void progressCalculatesForAuthenticatedUser() throws Exception {
        seedTwoTasks();
        var tasks = taskRepository.findAllByOrderByDayAscIdAsc();

        mockMvc.perform(patch("/api/tasks/" + tasks.get(0).getId() + "/status")
                .header("Authorization", "Bearer " + tokenA)
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        { "completed": true }
                        """));
        mockMvc.perform(patch("/api/tasks/" + tasks.get(0).getId() + "/status")
                .header("Authorization", "Bearer " + tokenB)
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        { "completed": true }
                        """));
        mockMvc.perform(patch("/api/tasks/" + tasks.get(1).getId() + "/status")
                .header("Authorization", "Bearer " + tokenB)
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        { "completed": true }
                        """));

        // User A sees: current_user completed=1, other_user completed=2
        mockMvc.perform(get("/api/tasks/progress")
                        .header("Authorization", "Bearer " + tokenA))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.total_tasks", is(2)))
                .andExpect(jsonPath("$.current_user.completed", is(1)))
                .andExpect(jsonPath("$.current_user.progress", closeTo(50.0, 0.01)))
                .andExpect(jsonPath("$.other_user.completed", is(2)))
                .andExpect(jsonPath("$.other_user.progress", closeTo(100.0, 0.01)))
                .andExpect(jsonPath("$.total_completed", is(3)));
    }

    @Test
    void nonexistentTaskReturns404() throws Exception {
        mockMvc.perform(patch("/api/tasks/999/status")
                        .header("Authorization", "Bearer " + tokenA)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "completed": true }
                                """))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status", is(404)))
                .andExpect(jsonPath("$.error", is("TASK_NOT_FOUND")))
                .andExpect(jsonPath("$.message", is("Task with id 999 not found")))
                .andExpect(jsonPath("$.path", is("/api/tasks/999/status")));
    }

    @Test
    void loginWithValidCredentials() throws Exception {
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "email": "loc@gmail.com", "password": "123" }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.user.name", is("Lộc")))
                .andExpect(jsonPath("$.user.email", is("loc@gmail.com")));
    }

    @Test
    void loginWithInvalidPasswordReturns401() throws Exception {
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "email": "loc@gmail.com", "password": "WrongPassword" }
                                """))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.message", is("Invalid email or password")));
    }

    private void seedTwoTasks() throws Exception {
        mockMvc.perform(post("/api/tasks/init")
                        .header("Authorization", "Bearer " + tokenA)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(FLAT_INIT_PAYLOAD))
                .andExpect(status().isCreated());
    }
}
