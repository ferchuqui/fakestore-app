import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Pagination from 'react-bootstrap/Pagination';
import { Spinner } from 'react-bootstrap';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Descargar productos automáticamente si localStorage está vacío
  useEffect(() => {
    const updateProducts = () => {
      const localProducts = JSON.parse(localStorage.getItem('products') || '[]');
      setProducts(localProducts);
    };
    const localProducts = JSON.parse(localStorage.getItem('products') || '[]');
    if (localProducts.length === 0) {
      setLoading(true);
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
        })
        .catch(() => {
          setError('Error al descargar productos. Intenta recargar la página.');
          setLoading(false);
        });
    } else {
      setProducts(localProducts);
    }
    window.addEventListener('storage', updateProducts);
    return () => window.removeEventListener('storage', updateProducts);
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

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
      <div
        className="row"
        style={{ minHeight: '700px', transition: 'min-height 0.2s' }}
      >
        {currentProducts.map(product => (
          <ProductCard key={product.id} product={{...product, showId: true}} />
        ))}
      </div>

      {/* Paginación */}
      <div className="d-flex justify-content-center mt-4">
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
    </div>
  );
}
