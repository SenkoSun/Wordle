package com.senkosun.wordle.repository;

import com.senkosun.wordle.entity.Words;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WordRepository extends JpaRepository<Words, Long> {
    // Проверка, есть ли слово в словаре
    boolean existsByWordIgnoreCase(String word);

    // Получить слово по его тексту
    Optional<Words> findByWord(String word);

    // Получить случайное слово определенной длины
    @Query(value = "SELECT * FROM words WHERE length = :length AND is_active = true ORDER BY RANDOM() LIMIT 1", nativeQuery = true)
    Optional<Words> findRandomWordByLength(@Param("length") int length);
}
