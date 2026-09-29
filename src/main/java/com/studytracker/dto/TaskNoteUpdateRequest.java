package com.studytracker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TaskNoteUpdateRequest {

    @NotBlank(message = "user is required")
    @Pattern(regexp = "user_a|user_b", message = "user must be user_a or user_b")
    private String user;

    private String note;

    public UserType resolveUser() {
        return UserType.fromValue(user);
    }
}
