package com.senkosun.wordle.repository;

import com.senkosun.wordle.entity.GameSession;
import com.senkosun.wordle.entity.GameStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface GameSessionRepository extends JpaRepository<GameSession, String> {
    // Удаление истекших сессий
    void deleteByCreatedAtBefore(LocalDateTime dateTime);
    // Проверка существования сессии
    boolean existsById(String id);
}