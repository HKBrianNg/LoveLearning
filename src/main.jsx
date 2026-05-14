import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LangProvider } from './context/LangContext';
import { ThemeProviderWrapper } from './context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProviderWrapper>
    <LangProvider>
      <App />
    </LangProvider>
  </ThemeProviderWrapper>
);