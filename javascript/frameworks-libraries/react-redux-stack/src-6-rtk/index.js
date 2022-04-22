import React from 'react';
import { createRoot } from 'react-dom/client';
// Components ---------------------------
import App from './App';
// Styles -------------------------------
import 'normalize.css';
import './index.css';
// --------------------------------------
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
