import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    clearCart();
    navigate('/gracias');
  };

  if (cart.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3>El carrito está vacío 🛒</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Carrito de Compras</h2>

      <ul className="list-group mb-4">
        {cart.map((item, i) => (
          <li
            key={i}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              {item.title} <span className="text-muted">(${item.price})</span>
            </div>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => removeFromCart(item.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Total a pagar:</h4>
        <h4 className="text-success">${total.toFixed(2)}</h4>
      </div>

      <div className="text-end">
        <button className="btn btn-primary" onClick={handleCheckout}>
          Finalizar compra
        </button>
      </div>
    </div>
  );
}