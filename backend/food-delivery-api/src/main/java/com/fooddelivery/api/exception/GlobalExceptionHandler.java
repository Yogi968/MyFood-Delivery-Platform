package com.fooddelivery.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleResourceNotFound(ResourceNotFoundException exception) {
        return exception.getMessage();
    }

    /**
     * Converts ResponseStatusException into a JSON response
     * containing the HTTP status and error message.
     *
     * @param exception the exception thrown by a controller
     * @return a response containing the status and error message
     */
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, Object>> handleResponseStatusException(
            ResponseStatusException exception) {

        Map<String, Object> response = Map.of(
                "status", exception.getStatusCode().value(),
                "message", exception.getReason()
        );

        return ResponseEntity
                .status(exception.getStatusCode())
                .body(response);
    }
}