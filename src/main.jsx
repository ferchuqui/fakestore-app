import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from './context/CartProvider';
import { AuthProvider } from './context/AuthContext';
import { HashRouter } from 'react-router-dom';
import './index.css';
import Contacto from './pages/Contacto';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
