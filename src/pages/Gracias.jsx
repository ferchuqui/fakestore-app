import { Link } from 'react-router-dom';

export default function Gracias() {
  return (
    <div className="container mt-5 text-center">
      <h2>¡Gracias por tu compra! 🎉</h2>
      <p>Te enviaremos un correo con los detalles del pedido.</p>
      <Link to="/" className="btn btn-success mt-3">
        Volver al inicio
      </Link>
    </div>
  );
}