package com.studytracker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Builder.Default
    @Column(name = "course_id")
    private String courseId = "java_backend";

    @Column(nullable = false)
    private Integer day;

    @Column
    private String phase;

    @Column
    private String topic;

    @Column(nullable = false)
    private String title;

    @Builder.Default
    @Column(name = "user_a_completed", nullable = false)
    private boolean userACompleted = false;

    @Builder.Default
    @Column(name = "user_b_completed", nullable = false)
    private boolean userBCompleted = false;

    @Lob
    @Column(name = "user_a_note", columnDefinition = "TEXT")
    private String userANote;

    @Lob
    @Column(name = "user_b_note", columnDefinition = "TEXT")
    private String userBNote;
}
