// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/main.css';
import { Toaster } from 'react-hot-toast';

// Vérifie que #root existe dans index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#1e293b',
          color: '#fff',
          borderRadius: '12px',
          padding: '1rem',
        },
      }}
    />
  </React.StrictMode>
);