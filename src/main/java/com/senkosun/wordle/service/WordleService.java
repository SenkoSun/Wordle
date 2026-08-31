package com.senkosun.wordle.service;

import com.senkosun.wordle.dto.response.GuessResponse;
import com.senkosun.wordle.dto.response.StartResponse;
import com.senkosun.wordle.entity.GameSession;
import com.senkosun.wordle.entity.GameStatus;
import com.senkosun.wordle.entity.Words;
import com.senkosun.wordle.repository.GameSessionRepository;
import com.senkosun.wordle.repository.WordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class WordleService {
    private final WordRepository wordRepository;
    private final GameSessionRepository gameSessionRepository;

    @Transactional
    public StartResponse createSession(int length) {
        Words word = wordRepository.findRandomWordByLength(length)
                .orElseThrow(() -> new RuntimeException("Word not found"));

        GameSession gameSession = GameSession.builder()
                .targetWord(word)
                .attemptsLeft(6)
                .createdAt(LocalDateTime.now())
                .status(GameStatus.PLAYING)
                .build();

        GameSession savedSession = gameSessionRepository.save(gameSession);

        return new StartResponse(savedSession.getId(),
                savedSession.getTargetWord().getLength(),
                savedSession.getCreatedAt(),
                savedSession.getStatus().name()
        );
    }

    @Transactional
    public GuessResponse makeGuess(String sessionId, String guessedWord) {
        // 1. Найти сессию
        GameSession session = gameSessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        // 2. Проверить статус игры
        if (session.getStatus() != GameStatus.PLAYING) {
            throw new RuntimeException("Game is already over");
        }

        // Преобразование в верхний регистер
        guessedWord = guessedWord.toUpperCase();

        // 3. Проверить слово в словаре
        if (!wordRepository.existsByWord(guessedWord)) {
            throw new WordNotFoundException("Word not found in dictionary");
        }

        // 4. Получить загаданное слово
        String targetWord = session.getTargetWord().getWord();

        // 5. Вычислить маску
        String mask = generateMask(guessedWord, targetWord);

        // 6. Обновить состояние сессии
        session.setAttemptsLeft(session.getAttemptsLeft() - 1);

        // 7. Проверить победу или поражение
        if (guessedWord.equals(targetWord)) {
            session.setStatus(GameStatus.WIN);
        } else if (session.getAttemptsLeft() == 0) {
            session.setStatus(GameStatus.LOST);
        }

        // 8. Сохранить изменения
        gameSessionRepository.save(session);

        // 9. Вернуть результат
        return GuessResponse.builder()
                .mask(mask)
                .attemptsLeft(session.getAttemptsLeft())
                .status(session.getStatus().name())
                .correctWord(session.getStatus() != GameStatus.PLAYING ? targetWord : null)
                .build();
    }

    private String generateMask(String guessed, String target) {
        StringBuilder mask = new StringBuilder();
        Map<Character, Integer> dict = new HashMap<>();
        for (int i = 0; i < target.length(); i++) {
            dict.put(target.charAt(i), dict.getOrDefault(target.charAt(i), 0) + 1);
        }

        for (int i = 0; i < guessed.length(); i++) {
            if (guessed.charAt(i) == target.charAt(i)) {
                mask.append("G");
                dict.put(target.charAt(i), dict.get(target.charAt(i)) - 1);
            }  else {
                mask.append("_");
            }
        }

        for (int i = 0; i < guessed.length(); i++) {
             if (guessed.charAt(i) != target.charAt(i) && dict.getOrDefault(guessed.charAt(i), 0) > 0) {
                mask.setCharAt(i,'Y');
                dict.put(guessed.charAt(i), dict.get(guessed.charAt(i)) - 1);
            }
        }

        return mask.toString();
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public class WordNotFoundException extends RuntimeException {
        public WordNotFoundException(String message) {
            super(message);
        }
    }



}
