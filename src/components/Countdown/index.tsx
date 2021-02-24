import { useTime } from '../../hooks/useTime';
import styles from './styles.module.scss';

export function Countdown() {
    const {
        minuteLeft, 
        minuteRight, 
        secondLeft, 
        secondRight,
        startCountdown,
    } = useTime(25);

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

            <button onClick={startCountdown} className={styles['countdown-button']} type="button">
                Iniciar um ciclo
            </button>
        </div>
    );
}