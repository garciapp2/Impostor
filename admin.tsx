import React from 'react';
import ReactDOM from 'react-dom/client';
import AdminPanel from './components/AdminPanel';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Elemento root não encontrado');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AdminPanel />
  </React.StrictMode>
);
