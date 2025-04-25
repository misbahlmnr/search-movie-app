import React from 'react';
import ReactDOM from 'react-dom/client';
import AppContainer from './components/AppContainer.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContainer />
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
