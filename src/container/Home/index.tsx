import Head from 'next/head';
import 
      { ExperienceBar, 
        Profile, 
        CompletedChallenges, 
        Countdown,
        ChallengeBox,
      } from '../../components';

import styles from './styles.module.scss';

export function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ínicio | move.it</title>
      </Head>
      <ExperienceBar />


      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdown />
        </div>
        <div>
          <ChallengeBox />
        </div>
      </section>
    </div>
  );
}
