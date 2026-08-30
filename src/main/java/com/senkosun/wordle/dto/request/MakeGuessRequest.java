package com.senkosun.wordle.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class MakeGuessRequest {
    @NotBlank(message = "Session ID is required")
    private String sessionId;

    @NotBlank(message = "Word is required")
    @Size(min = 4, max = 6, message = "Word must be exactly 5 letters")
    @Pattern(regexp = "^[а-яА-Я]+$", message = "Only letters are allowed")
    private String word;

}
