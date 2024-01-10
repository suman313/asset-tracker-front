import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import App from './App';
import { PermissionContextProvider } from './Context/PermissionsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PermissionContextProvider>
    <App />
    </PermissionContextProvider>
  </React.StrictMode>
);
