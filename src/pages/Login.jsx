// src/pages/Login.jsx
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate('/cart'); // Redirige a carrito tras logueo
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Iniciar sesión</h2>
      <button className="btn btn-primary mt-3" onClick={handleLogin}>
        Ingresar
      </button>
    </div>
  );
}
