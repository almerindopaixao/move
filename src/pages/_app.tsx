import { ChallengesProvider } from '../contexts';

import '../styles/global.scss';

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
        <Component {...pageProps} />
    </ChallengesProvider>
  )
}

export default MyApp
