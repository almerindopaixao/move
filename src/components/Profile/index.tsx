import styles from './styles.module.scss';

export function Profile() {
    return (
        <div className={styles['profile-container']}>
            <img src="https://github.com/almerindopaixao.png" alt="Almerindo Paixão"/>
            <div>
                <strong>Almerindo Paixão</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level 1
                </p>
            </div>
        </div>
    );
}