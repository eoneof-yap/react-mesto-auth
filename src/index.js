import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App.js';

const root = ReactDOM.createRoot(document.querySelector('#mesto-react-app'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
