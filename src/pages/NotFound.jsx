import { Link } from 'react-router-dom';
import custom404 from '../assets/fusta.png';

export default function NotFound() {
  return (
    <div className="container text-center my-5">
      <h1 className="display-1">404</h1>
      <h2>¡Ups! Esta página no tiene sello 😅</h2>
      <p>Tal vez alguien olvidó certificar esta ruta con un sello personalizado.</p>
            <img
        src={custom404}
        alt="Página no encontrada"
        style={{ maxWidth: '250px', margin: '2rem auto', display: 'block' }}
      />
      <div className="mt-4">
        <Link to="/" className="btn btn-primary">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}