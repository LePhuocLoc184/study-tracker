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
public class ProgressResponse {

    @JsonProperty("total_tasks")
    private long totalTasks;

    @JsonProperty("current_user")
    private UserProgress currentUser;

    @JsonProperty("other_user")
    private UserProgress otherUser;

    @JsonProperty("current_user_name")
    private String currentUserName;

    @JsonProperty("other_user_name")
    private String otherUserName;

    @JsonProperty("total_completed")
    private long totalCompleted;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UserProgress {
        private long completed;
        private double progress;
    }
}
