package com.senkosun.wordle.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class GuessResponse {
    private String mask;
    private int attemptsLeft;
    private String status;
    private String correctWord; // если статус != "PLAYING"
}