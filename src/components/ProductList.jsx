import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Pagination from 'react-bootstrap/Pagination';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Actualizar automáticamente cuando cambian los productos en localStorage
  useEffect(() => {
    const updateProducts = () => {
      const localProducts = JSON.parse(localStorage.getItem('products') || '[]');
      setProducts(localProducts);
    };
    updateProducts();
    window.addEventListener('storage', updateProducts);
    return () => window.removeEventListener('storage', updateProducts);
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4" id="productos">
      <div className="row">
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
