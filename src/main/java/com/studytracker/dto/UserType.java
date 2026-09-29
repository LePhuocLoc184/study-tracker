package com.studytracker.dto;

public enum UserType {
    USER_A("user_a"),
    USER_B("user_b");

    private final String value;

    UserType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static UserType fromValue(String value) {
        if (value == null) {
            throw new IllegalArgumentException("user must be user_a or user_b");
        }
        for (UserType type : values()) {
            if (type.value.equals(value)) {
                return type;
            }
        }
        throw new IllegalArgumentException("user must be user_a or user_b");
    }
}
