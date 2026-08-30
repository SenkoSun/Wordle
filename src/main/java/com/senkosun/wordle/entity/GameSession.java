package com.senkosun.wordle.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "game_session")
public class GameSession {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "word_id", nullable = false)
    private Words targetWord;

    @Column(nullable = false)
    private Integer attemptsLeft;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GameStatus status;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
