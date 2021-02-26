import { useContext } from 'react';
import { ChallengesContext } from '../../contexts';
import styles from './styles.module.scss';

export function CompletedChallenges() {
    const { challengesCompleted } = useContext(ChallengesContext)

    return (
        <div className={styles['completed-challenges-container']}>
            <span>Desafios completos</span>
            <span>{ challengesCompleted }</span>
        </div>
    );
}