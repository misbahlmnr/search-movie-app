import React from 'react';
import ReactDOM from 'react-dom/client';
import AppContainer from './components/AppContainer.tsx';
import './index.css';
import { StoreProvider } from './services/context/index.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <AppContainer />
      </QueryClientProvider>
    </StoreProvider>
  </React.StrictMode>
);
