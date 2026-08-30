package com.senkosun.wordle.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor

public class GuessResponse {
    private String mask;
    private int attemptsLeft;
    private String status;
    private String correctWord; // если статус != "PLAYING"
}