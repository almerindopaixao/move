import Head from 'next/head';
import 
      { ExperienceBar, 
        Profile, 
        CompletedChallenges, 
        Countdown,
        ChallengeBox,
      } from '../components';

import styles from '../styles/pages/Home.module.scss';

function App() {
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

export default App;
