import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ProductCard from './ProductCard';
import Pagination from 'react-bootstrap/Pagination';
import { Spinner } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [loading, setLoading] = useState(false);
  const [magic, setMagic] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const { user, isAuthenticated } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    categoryId: 1,
    image: '',
    stock: 10
  });
  const [success, setSuccess] = useState('');

  // Descargar productos automáticamente si localStorage está vacío
  useEffect(() => {
    const updateProducts = () => {
      const localProducts = JSON.parse(localStorage.getItem('products') || '[]');
      setProducts(localProducts);
    };
    const localProducts = JSON.parse(localStorage.getItem('products') || '[]');
    setMagic(true);
    setLoading(true);
    setTimeout(() => {
      if (localProducts.length === 0) {
        setError('');
        fetch('https://api.escuelajs.co/api/v1/products?limit=100&offset=0')
          .then(res => res.json())
          .then(data => {
            // Normalizar productos
            const normalized = data.map((p, idx) => ({
              id: p.id ?? idx + 1,
              title: p.title ?? 'Sin título',
              price: typeof p.price === 'number' ? p.price : 0,
              description: p.description ?? '',
              categoryId: p.categoryId ?? (p.category && p.category.id) ?? 1,
              images: Array.isArray(p.images) && p.images.length > 0 ? p.images : [p.image || 'https://placehold.co/300x200?text=Sin+Imagen'],
              stock: typeof p.stock === 'number' ? p.stock : 10
            }));
            localStorage.setItem('products', JSON.stringify(normalized));
            setProducts(normalized);
            setLoading(false);
            setMagic(false);
          })
          .catch(() => {
            setError('Error al descargar productos. Intenta recargar la página.');
            setLoading(false);
            setMagic(false);
          });
      } else {
        setProducts(localProducts);
        setLoading(false);
        setMagic(false);
      }
    }, 2000);
    window.addEventListener('storage', updateProducts);
    return () => window.removeEventListener('storage', updateProducts);
  }, []);

  // Filtrar productos por búsqueda (título, descripción, categoría, id o comentarios)
  const filteredProducts = products.filter(product => {
    const text = `${product.title} ${product.description} ${product.categoryId} ${product.id} ${(product.comments || '')}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Handlers para editar
  const handleShowModal = (product = null) => {
    setEditProduct(product);
    setForm(product ? {
      title: product.title,
      price: product.price,
      description: product.description,
      categoryId: product.categoryId || 1,
      image: product.images ? product.images[0] : '',
      stock: typeof product.stock === 'number' ? product.stock : 10
    } : {
      title: '', price: '', description: '', categoryId: 1, image: '', stock: 10
    });
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setEditProduct(null);
    setForm({ title: '', price: '', description: '', categoryId: 1, image: '', stock: 10 });
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };
  // Editar producto en localStorage
  const handleSubmit = e => {
    e.preventDefault();
    let newProducts = [...products];
    if (editProduct) {
      newProducts = newProducts.map(p =>
        p.id === editProduct.id
          ? { ...p, ...form, price: Number(form.price), categoryId: Number(form.categoryId), stock: Number(form.stock), images: [form.image || "https://placehold.co/300x200?text=Sin+Imagen"] }
          : p
      );
      localStorage.setItem('products', JSON.stringify(newProducts));
      setProducts(newProducts);
      setSuccess('Producto editado con éxito');
      setTimeout(() => setSuccess(''), 2500);
    }
    handleCloseModal();
  };

  // Borrar producto en localStorage
  const handleDelete = id => {
    if (!window.confirm('¿Seguro que deseas borrar este producto?')) return;
    const newProducts = products.filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(newProducts));
    setProducts(newProducts);
    setSuccess('Producto borrado con éxito');
    setTimeout(() => setSuccess(''), 2500);
  };

  if (magic) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary mb-3" style={{ width: '4rem', height: '4rem', animation: 'spin 1s linear infinite' }} role="status"></div>
        <span className="mt-3 fs-3 fw-bold text-primary">¡La magia comienza!</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '400px' }}>
        <Spinner animation="border" role="status" />
        <span className="mt-3 fs-4">Cargando productos mágicos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4" id="productos">
      {/* Buscador */}
      <div className="row mb-3">
        <div className="col-12 col-md-6 mx-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar productos por título, descripción, categoría, ID o comentarios..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
      {/* Paginación arriba del grid */}
      <div className="d-flex justify-content-center mb-4">
        <Pagination>
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
      <div
        className="row"
        style={{ minHeight: '700px', transition: 'min-height 0.2s' }}
      >
        {currentProducts.length === 0 ? (
          <div className="col-12 text-center mt-5">
            <div className="alert alert-info" role="alert">
              No se encontraron productos que coincidan con la búsqueda.
            </div>
          </div>
        ) : (
          currentProducts.map(product => (
            <div key={product.id} className="col-md-4 mb-4">
              <ProductCard 
                product={{...product, showId: true}}
                isAdmin={user?.role === 'admin'}
                onEdit={() => handleShowModal(product)}
                onDelete={() => handleDelete(product.id)}
              />
            </div>
          ))
        )}
      </div>

      {/* Modal para editar */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Título</label>
              <input name="title" className="form-control" value={form.title} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Precio</label>
              <input name="price" type="number" className="form-control" value={form.price} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <input name="description" className="form-control" value={form.description} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Categoría</label>
              <input name="categoryId" type="number" className="form-control" value={form.categoryId} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Imagen (URL)</label>
              <input name="image" className="form-control" value={form.image} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Stock</label>
              <input name="stock" type="number" className="form-control" value={form.stock} onChange={handleChange} required />
            </div>
            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-secondary me-2" onClick={handleCloseModal}>Cancelar</button>
              <button type="submit" className="btn btn-primary">Guardar cambios</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {success && (
        <div className="alert alert-success mt-3 text-center">{success}</div>
      )}
    </div>
  );
}
