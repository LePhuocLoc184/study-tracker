package com.studytracker.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class NestedTaskInitRequest {

    private String id;

    @NotBlank(message = "title is required")
    private String title;

    @JsonProperty("completed_by")
    private CompletedBy completedBy;

    private Notes notes;

    @Getter
    @Setter
    @NoArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class CompletedBy {
        @JsonProperty("user_a")
        private Boolean userA;

        @JsonProperty("user_b")
        private Boolean userB;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Notes {
        @JsonProperty("user_a")
        private String userA;

        @JsonProperty("user_b")
        private String userB;
    }
}
