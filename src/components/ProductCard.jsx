import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [showMessage, setShowMessage] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000); // mensaje visible 2 segundos
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img src={product.images[0]} className="card-img-top" alt={product.title} />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">${product.price}</p>

          <div className="d-flex justify-content-between gap-2">
            <button className="btn btn-primary w-100" onClick={handleAddToCart}>
              Agregar al carrito
            </button>
            <button className="btn btn-danger w-100">
              Más información
            </button>
          </div>

          {showMessage && (
            <div className="alert alert-success mt-3 p-2 text-center">
              ✅ <strong>{product.title}</strong> se ha cargado al carrito.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
