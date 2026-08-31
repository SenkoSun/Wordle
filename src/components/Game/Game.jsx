import React, { useEffect } from 'react';
import Board from '../Board/Board';
import Keyboard from '../Keyboard/Keyboard';
import { useGame } from '../../hooks/useGame';
import styles from './Game.module.css';

const Game = () => {
    const {
        guesses,
        currentGuess,
        gameStatus,
        message,
        isLoading,
        startGame,
        submitGuess,
        addLetter,
        removeLetter,
        WORD_LENGTH,
        MAX_ATTEMPTS,
    } = useGame();

    // Запрещаем перезагрузку страницы при нажатии Enter
    useEffect(() => {
        const handleGlobalKeyDown = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => {
            window.removeEventListener('keydown', handleGlobalKeyDown);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className={styles.game}>
            <h1 className={styles.title}>Wordle</h1>

            {message && (
                <div className={styles.message}>{message}</div>
            )}

            <Board
                guesses={guesses}
                currentGuess={currentGuess}
                wordLength={WORD_LENGTH}
                maxAttempts={MAX_ATTEMPTS}
                gameStatus={gameStatus}
            />

            {gameStatus !== 'PLAYING' && (
                <button className={styles.newGame} onClick={startGame}>
                    Новая игра
                </button>
            )}

            <form onSubmit={handleSubmit}>
                <Keyboard
                    onKeyPress={addLetter}
                    onDelete={removeLetter}
                    onSubmit={submitGuess}
                    gameStatus={gameStatus}
                />
            </form>

            {/*{isLoading && <div className={styles.loading}>Загрузка...</div>}*/}
        </div>
    );
};

export default Game;