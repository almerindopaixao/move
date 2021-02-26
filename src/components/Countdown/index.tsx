import { useContext } from 'react';

import { CountdownContext } from '../../contexts';

import styles from './styles.module.scss';

export function Countdown() {
    const { 
        minutes, 
        seconds, 
        handleClickButtonCoutdown, 
        hasFinished, 
        isActive 
    } = useContext(CountdownContext);

    const [minuteLeft, minuteRight]: string[] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight]: string[] = String(seconds).padStart(2, '0').split('');

    return (
        <div>
            <div className={styles['countdown-container']}> 
                <div>
                    <span>{ minuteLeft }</span>
                    <span>{ minuteRight }</span>
                </div>
                <span>:</span>
                <div>
                    <span>{ secondLeft }</span>
                    <span>{ secondRight }</span>
                </div>
            </div>

            { hasFinished ? (
                <button 
                 disabled
                 className={styles['countdown-button']}
                >
                    Ciclo encerrado
                </button>
            ) : (
                <button 
                    onClick={handleClickButtonCoutdown} 
                    className={`
                        ${styles['countdown-button']} 
                        ${isActive && styles['countdown-button-active']}`} 
                    type="button"
                >
                    { isActive ?  'Abandonar ciclo' : 'Iniciar um ciclo'}
                </button>
            )}
        </div>
    );
}