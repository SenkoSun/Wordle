package com.senkosun.wordle.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class StartRequest {
    @NotNull(message = "Word length is required")
    @Min(value = 3, message = "Word length must be at least 3")
    private Integer wordLength = 5;
}
