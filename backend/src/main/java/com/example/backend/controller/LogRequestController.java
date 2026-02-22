package com.example.backend.controller;

import com.example.backend.model.LogRequest;
import com.example.backend.service.LogRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/logs")
@CrossOrigin
public class LogRequestController {

    private final LogRequestService service;

    public LogRequestController(LogRequestService service) {
        this.service = service;
    }

    // 1️⃣ Listar todos los logs
    @GetMapping
    public List<LogRequest> getAllLogs() {
        return service.findAll();
    }

    // 2️⃣ Obtener log por ID
    @GetMapping("/{id}")
    public ResponseEntity<LogRequest> getLogById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 3️⃣ Crear log manualmente (opcional pero útil)
    @PostMapping
    public LogRequest createLog(@RequestBody LogRequest logRequest) {
        return service.save(logRequest);
    }

    // 4️⃣ Editar log
    @PutMapping("/{id}")
    public ResponseEntity<LogRequest> updateLog(@PathVariable Long id,
                                                @RequestBody LogRequest updatedLog) {

        return service.findById(id)
                .map(existingLog -> {
                    existingLog.setDate(updatedLog.getDate());
                    existingLog.setHttpMethod(updatedLog.getHttpMethod());
                    existingLog.setEndpoint(updatedLog.getEndpoint());
                    existingLog.setStatus(updatedLog.getStatus());
                    existingLog.setResponse(updatedLog.getResponse());
                    return ResponseEntity.ok(service.save(existingLog));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 5️⃣ Eliminar log
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLog(@PathVariable Long id) {

        if (service.findById(id).isPresent()) {
            service.deleteById(id);
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}