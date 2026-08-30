package com.senkosun.wordle.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor

public class StartResponse {
    private String sessionId;
    private Integer wordLength;
    private LocalDateTime createdAt;
    private String status;
}