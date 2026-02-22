package com.example.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "log_request")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LogRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime date;

    private String httpMethod;

    private String endpoint;

    private Integer status;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String response;
}