import { Home } from '../container/Home';
import { CountdownProvider } from '../contexts';

function App() {
  return (
    <CountdownProvider>
      <Home />
    </CountdownProvider>
  );
}

export default App;
