import { useState, useEffect, useContext } from 'react';
import styles from './styles.module.scss';

import { ChallengesContext } from '../../contexts/ChallengesContext';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState<number>(0.1 * 60);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [hasFinished, setHasFinished] = useState<boolean>(false);

    const minutes: number = Math.floor(time / 60);
    const seconds: number = time % 60;

    const [minuteLeft, minuteRight]: string[] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight]: string[] = String(seconds).padStart(2, '0').split('');
    function handleClickButtonCoutdown() {
        if (!isActive) {
            startCountdown();
        } else {
            resetCoutdown();
        }
    }
    function startCountdown(): void {
        setIsActive(true);
    }

    function resetCoutdown(): void {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(0.1 * 60);
    }

    useEffect(() => {
        if (isActive && time > 0) {
           countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);

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