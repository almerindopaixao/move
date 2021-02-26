import { useContext } from 'react'; 
import { ChallengesContext, CountdownContext } from '../../contexts';

import styles from './styles.module.scss';

export function ChallengeBox() {    
    const { 
        activeChallenge, 
        resetChallenge, 
        completeChallenge 
    } = useContext(ChallengesContext);

    const {  resetCountdown  } = useContext(CountdownContext);

    function handleChallengeSucceeded() {
        completeChallenge();
        resetCountdown();
    }

    function handleChallengeFailed() {
        resetChallenge();
        resetCountdown();
    }

    return (
        <div className={styles['challenge-box-container']}>
            { activeChallenge ? (
                <div className={styles['challenge-active']}>
                    <header>Ganhe {activeChallenge.amount} xp</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="Body"/>
                        <strong>Novo desafio</strong>
                        <p>{ activeChallenge.description }</p>
                    </main>

                    <footer>
                        <button 
                            type="button"
                            className={styles['challenge-failed-button']}
                            onClick={handleChallengeFailed}
                        >
                            Falhei
                        </button>
                        <button 
                            type="button"
                            className={styles['challenge-succeeded-button']}
                            onClick={handleChallengeSucceeded}
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles['challenge-not-active']}>
                <strong>Finalize um ciclo para receber um desafio</strong>

                <p>
                    <img src="icons/level-up.svg" alt="Level Up"/>
                    Avance de level completando desafios
                </p>
            </div>
            ) }
        </div>
    );
}