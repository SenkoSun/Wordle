package com.senkosun.wordle.controller;

import com.senkosun.wordle.service.WordleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class WordleController {

    private final WordleService wordleService;

//    @GetMapping
//    public ResponseEntity<> getWord() {
//
//        return ResponseEntity.ok();
//    }


}
