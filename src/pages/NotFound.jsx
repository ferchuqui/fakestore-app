import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container text-center my-5">
      <h1 className="display-1">404</h1>
      <h2>¡Ups! Esta página no tiene sello 😅</h2>
      <p>Tal vez alguien olvidó certificar esta ruta con un sello personalizado.</p>
      <img src="https://cdn-icons-png.flaticon.com/512/3103/3103446.png" alt="Sello" width="150" />
      <div className="mt-4">
        <Link to="/" className="btn btn-primary">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}