import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from './context/CartProvider';
import { HashRouter } from 'react-router-dom';
import './index.css';
import Contacto from './pages/Contacto';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <HashRouter>
        <App />
        <Contacto />
      </HashRouter>
    </CartProvider>
  </React.StrictMode>
);
