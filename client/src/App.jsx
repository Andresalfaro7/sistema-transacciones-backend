import { BrowserRouter } from 'react-router-dom';
import Router from './router/router';

import Preloader from './partials/Preloader';
import Header from './partials/Header';

import { AuthProvider } from './contexts/AuthContext';
import { CardProvider } from './contexts/CardsContext';

function App() {
  return (
    <AuthProvider>
      <CardProvider>
        <BrowserRouter>
          {/* <Preloader /> */}
          <div className="flex h-screen overflow-hidden">
            <Router />
          </div>
        </BrowserRouter>
      </CardProvider>
    </AuthProvider>
  )
}

export default App;
