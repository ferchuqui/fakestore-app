import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div className="container mt-4">
      <h2>Carrito</h2>
      <ul className="list-group">
        {cart.map((item, i) => (
          <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
            {item.title}
            <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}