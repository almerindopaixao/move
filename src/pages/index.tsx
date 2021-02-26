import { GetServerSideProps } from 'next';
import { Home } from '../container/Home';
import { CountdownProvider, ChallengesProvider } from '../contexts';

interface AppProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

function App({ challengesCompleted, currentExperience,level }: AppProps) {
  return (
    <ChallengesProvider 
      level={level}
      currentExperience={currentExperience}
      challengesCompleted={challengesCompleted}
    >
      <CountdownProvider>
        <Home />
      </CountdownProvider>  
    </ChallengesProvider>  
  );
}

export default App;

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { level, currentExperience, challengesCompleted } = context.req.cookies;
 
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  }
}