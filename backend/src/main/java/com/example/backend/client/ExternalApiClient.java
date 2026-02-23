package com.example.backend.client;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class ExternalApiClient {

    private final RestTemplate restTemplate = new RestTemplate();

    private final String BASE_URL = "https://jsonplaceholder.typicode.com";

    public String getUsers() {
        return restTemplate.getForObject(BASE_URL + "/users", String.class);
    }

    public String getPosts() {
        return restTemplate.getForObject(BASE_URL + "/posts", String.class);
    }

    public String getPostsByUser(Long userId) {
        return restTemplate.getForObject(
                BASE_URL + "/posts?userId=" + userId,
                String.class
        );
    }

    public String getAlbumsByUser(Long userId) {
        return restTemplate.getForObject(BASE_URL + "/albums?userId=" + userId, String.class);
    }
}