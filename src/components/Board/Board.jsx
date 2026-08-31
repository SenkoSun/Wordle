import React from 'react';
import Cell from '../Cell/Cell';
import styles from './Board.module.css';

const Board = ({ guesses, currentGuess, wordLength, maxAttempts, gameStatus }) => {
    // Создаем строки для отображения
    const renderBoard = () => {
        const rows = [];

        for (let row = 0; row < maxAttempts; row++) {
            const guess = guesses[row];
            const isCurrentRow = row === guesses.length;
            const isGameOver = gameStatus !== 'PLAYING';

            let rowContent;

            if (guess) {
                // Заполненная строка
                rowContent = guess.word.split('').map((letter, col) => (
                    <Cell key={col} letter={letter} status={guess.mask[col]} />
                ));
            } else if (isCurrentRow && !isGameOver) {
                // Текущая строка ввода
                const currentRow = currentGuess.padEnd(wordLength, ' ');
                rowContent = currentRow.split('').map((letter, col) => (
                    <Cell key={col} letter={letter} status="" />
                ));
            } else {
                // Пустая строка (заглушка)
                rowContent = [...Array(wordLength)].map((_, col) => (
                    <Cell key={col} letter="" status="" />
                ));
            }

            rows.push(
                <div key={row} className={styles.row}>
                    {rowContent}
                </div>
            );
        }

        return rows;
    };

    return <div className={styles.board}>{renderBoard()}</div>;
};

export default Board;