import { useContext } from 'react';
import { ChallengesContext } from '../../contexts';
import styles from './styles.module.scss';

export function Profile() {
    const { level } = useContext(ChallengesContext);

    return (
        <div className={styles['profile-container']}>
            <img src="https://github.com/almerindopaixao.png" alt="Almerindo Paixão"/>
            <div>
                <strong>Almerindo Paixão</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level { level }
                </p>
            </div>
        </div>
    );
}