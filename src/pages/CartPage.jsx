import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
            <div className="d-flex align-items-center gap-3">
              <img
                src={item.images?.[0] || item.image || 'https://via.placeholder.com/60'}
                alt={item.title}
                style={{
                  width: '60px',
                  height: '60px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
              <div>
                <strong>{item.title}</strong><br />
                Precio unitario: ${item.price}<br />
                Cantidad: {item.quantity}<br />
                <span className="text-muted">
                  Subtotal: ${item.price * item.quantity}
                </span>
              </div>
            </div>
            <div className="btn-group">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => removeFromCart(item.id)}
              >
                −
              </button>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => addToCart(item)}
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Total a pagar:</h4>
        <h4 className="text-success">${total.toFixed(2)}</h4>
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-danger" onClick={clearCart}>
          Vaciar carrito
        </button>

        <button className="btn btn-primary" onClick={handleCheckout}>
          Finalizar compra
        </button>
      </div>
    </div>
  );
}
