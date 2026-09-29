package com.studytracker.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
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
public class TaskResponse {

    private Long id;
    private Integer day;
    private String phase;
    private String topic;
    private String title;

    @JsonProperty("user_a_completed")
    private boolean userACompleted;

    @JsonProperty("user_b_completed")
    private boolean userBCompleted;

    @JsonProperty("user_a_note")
    private String userANote;

    @JsonProperty("user_b_note")
    private String userBNote;
}
