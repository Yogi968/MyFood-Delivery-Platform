package com.fooddelivery.api.dto;

public class LoginResponse {

    private Long id;
    private String email;
    private String message;
    private String token;

    public LoginResponse(
            Long id,
            String email,
            String message,
            String token) {

        this.id = id;
        this.email = email;
        this.message = message;
        this.token = token;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getMessage() {
        return message;
    }

    public String getToken() {
        return token;
    }
}