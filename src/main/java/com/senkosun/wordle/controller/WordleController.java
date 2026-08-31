package com.senkosun.wordle.controller;

import com.senkosun.wordle.dto.request.MakeGuessRequest;
import com.senkosun.wordle.dto.request.StartRequest;
import com.senkosun.wordle.dto.response.GuessResponse;
import com.senkosun.wordle.dto.response.StartResponse;
import com.senkosun.wordle.service.WordleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class WordleController {

    private final WordleService wordleService;

    @PostMapping("/create")
    public ResponseEntity<StartResponse> createGame(@Valid @RequestBody StartRequest request) {
        StartResponse response = wordleService.createSession(request.getWordLength());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/guess")
    public ResponseEntity<GuessResponse> makeGuess(@Valid @RequestBody MakeGuessRequest request) {
        GuessResponse response = wordleService.makeGuess(request.getSessionId(), request.getWord());
        return ResponseEntity.ok(response);
    }

}
