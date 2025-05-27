import { Link } from 'react-router-dom';
import custom404 from '../assets/fusta.png';

export default function NotFound() {
  return (
    <div className="text-center mt-5 animate-fade">
      <h1 className="display-1">404</h1>
      <h2 className="mb-3">¡Ups! Esta página no existe.</h2>
      <p className="mb-4">Verificá la dirección o volvé al inicio.</p>
      <img
        src={custom404}
        alt="Página no encontrada"
        style={{
          maxWidth: '260px',
          margin: '2rem auto',
          display: 'block',
          animation: 'fadeUp 0.8s ease'
        }}
      />
      <Link to="/" className="btn btn-primary mt-4">
        <i className="bi bi-house-door me-2"></i> Volver al inicio
      </Link>
    </div>
  );
}
