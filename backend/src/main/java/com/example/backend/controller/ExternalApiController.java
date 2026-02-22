package com.example.backend.controller;

import com.example.backend.client.ExternalApiClient;
import com.example.backend.model.LogRequest;
import com.example.backend.service.LogRequestService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ExternalApiController {

    private final ExternalApiClient client;
    private final LogRequestService logService;

    public ExternalApiController(ExternalApiClient client,
                                 LogRequestService logService) {
        this.client = client;
        this.logService = logService;
    }

    @GetMapping("/users")
    public String getUsers() {
        String response = client.getUsers();

        saveLog("GET", "/users", 200, response);

        return response;
    }

    @GetMapping("/posts")
    public String getPosts() {
        String response = client.getPosts();

        saveLog("GET", "/posts", 200, response);

        return response;
    }

    @GetMapping("/albums/{userId}")
    public String getAlbumsByUser(@PathVariable Long userId) {
        String response = client.getAlbumsByUser(userId);

        saveLog("GET", "/albums?userId=" + userId, 200, response);

        return response;
    }

    private void saveLog(String method, String endpoint, Integer status, String response) {
        LogRequest log = LogRequest.builder()
                .date(LocalDateTime.now())
                .httpMethod(method)
                .endpoint(endpoint)
                .status(status)
                .response(response)
                .build();

        logService.save(log);
    }
}