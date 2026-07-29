import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from 'wouter';

import App from './App';
import { dir, lang } from './lib/i18n';

import './index.css';

document.documentElement.lang = lang;
document.documentElement.dir = dir;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <App />
    </Router>
  </StrictMode>,
);
