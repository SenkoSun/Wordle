import { useState, useEffect, useCallback } from 'react';
import { gameApi } from '../api/gameApi';

const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 4;

export const useGame = () => {
    const [sessionId, setSessionId] = useState(null);
    const [guesses, setGuesses] = useState([]);
    const [currentGuess, setCurrentGuess] = useState('');
    const [gameStatus, setGameStatus] = useState('PLAYING');
    const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);
    const [correctWord, setCorrectWord] = useState(null);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const startGame = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await gameApi.createSession(WORD_LENGTH);
            setSessionId(data.sessionId);
            setAttemptsLeft(MAX_ATTEMPTS);
            setGameStatus('PLAYING');
            setGuesses([]);
            setCurrentGuess('');
            setCorrectWord(null);
            setMessage('');
        } catch (error) {
            console.error('Failed to start game:', error);
            setMessage('Ошибка при создании игры');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const submitGuess = useCallback(async () => {
        console.log('submitGuess called');
        console.log('sessionId:', sessionId);
        console.log('currentGuess:', currentGuess);
        console.log('gameStatus:', gameStatus);

        if (!sessionId) {
            console.log('No sessionId');
            return;
        }
        if (currentGuess.length !== WORD_LENGTH) {
            console.log('Word length is not 4');
            return;
        }
        if (gameStatus !== 'PLAYING') {
            console.log('Game is not playing');
            return;
        }

        setIsLoading(true);
        try {
            const result = await gameApi.makeGuess(sessionId, currentGuess);

            setGuesses(prev => [...prev, {
                word: currentGuess,
                mask: result.mask,
                attempt: prev.length + 1
            }]);

            setAttemptsLeft(result.attemptsLeft);
            setGameStatus(result.status);
            setCurrentGuess('');

            if (result.correctWord) {
                setCorrectWord(result.correctWord);
            }

            if (result.status === 'WON') {
                setMessage('🎉 Поздравляю! Вы угадали слово!');
            } else if (result.status === 'LOST') {
                setMessage(`😢 Вы проиграли. Загаданное слово: ${result.correctWord}`);
            }

        } catch (error) {
            console.error('Failed to make guess:', error);
            if (error.response?.status === 400) {
                setMessage('Слово не найдено в словаре');
            } else {
                setMessage('Ошибка при проверке слова');
            }
        } finally {
            setIsLoading(false);
        }
    }, [sessionId, currentGuess, gameStatus]);

    const addLetter = useCallback((letter) => {
        console.log('addLetter called:', letter);
        if (gameStatus !== 'PLAYING') return;
        if (currentGuess.length < WORD_LENGTH) {
            setCurrentGuess(prev => prev + letter.toUpperCase());
            setMessage('');
        }
    }, [currentGuess, gameStatus]);

    const removeLetter = useCallback(() => {
        console.log('removeLetter called');
        if (currentGuess.length > 0) {
            setCurrentGuess(prev => prev.slice(0, -1));
        }
    }, [currentGuess]);

    // Обработка физической клавиатуры
    useEffect(() => {
        const handleKeyDown = (event) => {
            const key = event.key;

            // Игнорируем комбинации с модификаторами
            if (event.altKey || event.ctrlKey || event.metaKey) {
                console.log('Modifier key pressed, ignored');
                return;
            }

            if (gameStatus !== 'PLAYING') {
                console.log('Game not playing, ignored');
                return;
            }

            // Enter
            if (key === 'Enter') {
                console.log('Enter pressed');
                event.preventDefault(); // ← Только здесь!
                submitGuess();
                return;
            }

            // Backspace
            if (key === 'Backspace') {
                console.log('Backspace pressed');
                event.preventDefault(); // ← И здесь!
                removeLetter();
                return;
            }

            // Если это не одна буква (например, Shift, Control, Alt)
            if (key.length !== 1) {
                console.log('Not a letter key:', key);
                return;
            }

            // Проверяем русскую или английскую букву
            const isRussianLetter = /[А-ЯЁа-яё]/.test(key);
            const isEnglishLetter = /[A-Za-z]/.test(key);

            if (isRussianLetter || isEnglishLetter) {
                console.log('Letter pressed:', key);
                event.preventDefault(); // ← И здесь!
                addLetter(key.toUpperCase());
            } else {
                console.log('Not a letter:', key);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [gameStatus, submitGuess, addLetter, removeLetter]);

    useEffect(() => {
        startGame();
    }, [startGame]);

    return {
        sessionId,
        guesses,
        currentGuess,
        gameStatus,
        attemptsLeft,
        correctWord,
        message,
        isLoading,
        startGame,
        submitGuess,
        addLetter,
        removeLetter,
        WORD_LENGTH,
        MAX_ATTEMPTS,
    };
};