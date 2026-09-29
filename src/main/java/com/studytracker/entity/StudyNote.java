package com.studytracker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "study_notes")
public class StudyNote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "course_id", nullable = false)
    private String courseId;

    @Column(name = "day_number", nullable = false)
    private Integer dayNumber;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String content;

    @Lob
    @Column(name = "learned_content", columnDefinition = "TEXT")
    private String learnedContent;

    @Lob
    @Column(name = "key_concepts", columnDefinition = "TEXT")
    private String keyConcepts;

    @Lob
    @Column(name = "difficult_parts", columnDefinition = "TEXT")
    private String difficultParts;

    @Lob
    @Column(name = "review_items", columnDefinition = "TEXT")
    private String reviewItems;

    @Builder.Default
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
}
