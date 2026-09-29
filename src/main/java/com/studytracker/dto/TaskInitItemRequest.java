package com.studytracker.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class TaskInitItemRequest {

    @NotNull(message = "day is required")
    private Integer day;

    private String phase;
    private String topic;
    private String title;

    @JsonProperty("user_a_completed")
    private Boolean userACompleted;

    @JsonProperty("user_b_completed")
    private Boolean userBCompleted;

    @JsonProperty("user_a_note")
    private String userANote;

    @JsonProperty("user_b_note")
    private String userBNote;

    @Valid
    private List<NestedTaskInitRequest> tasks;

    public boolean isGrouped() {
        return tasks != null && !tasks.isEmpty();
    }
}
