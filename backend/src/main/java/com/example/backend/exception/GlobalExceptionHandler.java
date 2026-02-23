package com.example.backend.exception;

import com.example.backend.model.LogRequest;
import com.example.backend.service.LogRequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    private final LogRequestService logService;

    public GlobalExceptionHandler(LogRequestService logService) {
        this.logService = logService;
    }

    @ExceptionHandler(ApiSimulationException.class)
    public ResponseEntity<String> handleSimulationError(ApiSimulationException ex) {

        // Guardar log del error simulado
        LogRequest log = LogRequest.builder()
                .date(LocalDateTime.now())
                .httpMethod("GET")
                .endpoint("/users?simulateError=true")
                .status(500)
                .response(ex.getMessage())
                .build();

        logService.save(log);

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }
}