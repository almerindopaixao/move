import styles from './styles.module.scss';

export function CompletedChallenges() {
    return (
        <div className={styles['completed-challenges-container']}>
            <span>Desafios completos</span>
            <span>5</span>
        </div>
    );
}