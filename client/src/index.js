import React from 'react';
import ReactDOM from 'react-dom/client';
import { PlayerProvider } from './context/PlayerContextProvider.js';
import { DirectionProvider } from './context/DirectionContextProvider.js';
import { AliveProvider } from './context/AliveContextProvider.js';
import App from './components/App/App.jsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AliveProvider>
      <PlayerProvider>
        <DirectionProvider>
          <App />
        </DirectionProvider>
      </PlayerProvider>
    </AliveProvider>
  </React.StrictMode>
);
