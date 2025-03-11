import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import QueryClientWrapper from './providers/QueryClientProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientWrapper>
      <App />
    </QueryClientWrapper>
  </StrictMode>
);
