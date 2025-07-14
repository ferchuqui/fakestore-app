import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Modal, Button } from 'react-bootstrap';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [showMessage, setShowMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000); // mensaje visible 2 segundos
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddToCartFromModal = () => {
    addToCart(product);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
    handleCloseModal();
  };

  const imageUrl = product.images && product.images[0] ? product.images[0] : 'https://placehold.co/300x200?text=Sin+Imagen';

  const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Pellentesque euismod, nisi eu consectetur consectetur.`;

  const stock = typeof product.stock === 'number' ? product.stock : 10;

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img src={imageUrl} className="card-img-top" alt={product.title} style={{ width: 300, height: 200, objectFit: 'cover', borderRadius: 8, margin: '0 auto' }} />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">${product.price}</p>

          <div className="d-flex justify-content-between gap-2">
            <button className="btn btn-primary w-100" onClick={handleAddToCart}>
              Agregar al carrito
            </button>
            <button className="btn btn-danger w-100" onClick={handleShowModal}>
              Más información
            </button>
          </div>

          {showMessage && (
            <div className="alert alert-success mt-3 p-2 text-center">
              ✅ <strong>{product.title}</strong> se ha cargado al carrito.
            </div>
          )}
          {product.showId && (
            <div className="text-muted" style={{ fontSize: 13, marginBottom: 4 }}>ID: {product.id}</div>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{product.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img src={imageUrl} alt={product.title} style={{ width: 300, height: 200, objectFit: 'cover', borderRadius: 8, marginBottom: 16 }} />
          <div className="mb-2"><strong>ID:</strong> {product.id}</div>
          <div className="mb-2"><strong>Precio:</strong> ${product.price}</div>
          <div className="mb-2">
            <strong>Stock:</strong> {stock === 0 ? <span style={{color: 'red'}}>Agotado</span> : stock}
          </div>
          <p className="mt-3"><strong>Descripción:</strong> {product.description}</p>
          <p style={{ fontSize: 14, color: '#555' }}>{lorem}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleAddToCartFromModal} disabled={stock === 0}>
            Agregar al carrito
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
