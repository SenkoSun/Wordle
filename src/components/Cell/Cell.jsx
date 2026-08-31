import React from 'react';
import styles from './Cell.module.css';

const Cell = ({ letter, status = '' }) => {
    // Определяем класс по статусу
    const getStatusClass = () => {
        switch (status) {
            case 'G': return styles.green;   // Зеленая (правильная буква на месте)
            case 'Y': return styles.yellow;  // Желтая (буква есть, но не на месте)
            case '_': return styles.gray;    // Серая (буквы нет)
            default: return '';
        }
    };

    return (
        <div className={`${styles.cell} ${getStatusClass()}`}>
            {letter}
        </div>
    );
};

export default Cell;