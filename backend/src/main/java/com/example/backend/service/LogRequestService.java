package com.example.backend.service;

import com.example.backend.model.LogRequest;
import com.example.backend.repository.LogRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LogRequestService {

    private final LogRequestRepository repository;

    public LogRequestService(LogRequestRepository repository) {
        this.repository = repository;
    }

    public LogRequest save(LogRequest logRequest) {
        return repository.save(logRequest);
    }

    public List<LogRequest> findAll() {
        return repository.findAll();
    }

    public Optional<LogRequest> findById(Long id) {
        return repository.findById(id);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}