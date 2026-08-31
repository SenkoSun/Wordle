import React from 'react';
import styles from './Keyboard.module.css';

const Keyboard = ({ onKeyPress, onDelete, onSubmit, gameStatus }) => {
    const rows = [
        ['Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ'],
        ['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э'],
        ['Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю'],
    ];

    const isDisabled = gameStatus !== 'PLAYING';

    return (
        <div className={styles.keyboard}>
            {rows.map((row, idx) => (
                <div key={idx} className={styles.row}>
                    {row.map((letter) => (
                        <button
                            key={letter}
                            className={styles.key}
                            onClick={() => onKeyPress(letter)}
                            disabled={isDisabled}
                            tabIndex="-1" // ← Запрещаем фокус
                        >
                            {letter}
                        </button>
                    ))}
                </div>
            ))}
            <div className={styles.row}>
                <button
                    className={`${styles.key} ${styles.special}`}
                    onClick={onDelete}
                    disabled={isDisabled}
                    tabIndex="-1" // ← Запрещаем фокус
                >
                    ⌫
                </button>
                <button
                    className={`${styles.key} ${styles.special}`}
                    onClick={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}
                    disabled={isDisabled}
                    type="button"
                    tabIndex="-1" // ← Запрещаем фокус
                >
                    Enter
                </button>
            </div>
        </div>
    );
};

export default Keyboard;