import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img src={product.images[0]} className="card-img-top" alt={product.title} />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">${product.price}</p>
         <div className="d-flex justify-content-between gap-2">
  <button className="btn btn-primary w-100" onClick={() => addToCart(product)}>
    Agregar al carrito
  </button>
  <button className="btn btn-danger w-100">
    Más información
  </button>
</div>
        </div>
      </div>
    </div>
  );
}