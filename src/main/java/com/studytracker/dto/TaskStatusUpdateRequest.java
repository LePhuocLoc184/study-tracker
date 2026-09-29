package com.studytracker.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TaskStatusUpdateRequest {

    @NotBlank(message = "user is required")
    @Pattern(regexp = "user_a|user_b", message = "user must be user_a or user_b")
    private String user;

    @NotNull(message = "completed must not be null")
    private Boolean completed;

    public UserType resolveUser() {
        return UserType.fromValue(user);
    }

    @JsonProperty("completed")
    public Boolean getCompleted() {
        return completed;
    }
}
