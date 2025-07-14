import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Button, Table, Modal, Form, Alert, Spinner, Pagination } from 'react-bootstrap';

export default function AdminProducts() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    categoryId: 1,
    images: ['https://placeimg.com/640/480/any']
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Obtener productos
  useEffect(() => {
    setLoading(true);
    fetch('https://api.escuelajs.co/api/v1/products?limit=100&offset=0')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar productos');
        setLoading(false);
      });
  }, []);

  // Calcular productos a mostrar
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Handlers para crear/editar
  const handleShowModal = (product = null) => {
    setEditProduct(product);
    setForm(product ? {
      title: product.title,
      price: product.price,
      description: product.description,
      categoryId: product.category?.id || 1,
      images: product.images || ['https://placeimg.com/640/480/any']
    } : {
      title: '', price: '', description: '', categoryId: 1, images: ['https://placeimg.com/640/480/any']
    });
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setEditProduct(null);
    setForm({ title: '', price: '', description: '', categoryId: 1, images: ['https://placeimg.com/640/480/any'] });
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // Crear o editar producto
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    const method = editProduct ? 'PUT' : 'POST';
    const url = editProduct
      ? `https://api.escuelajs.co/api/v1/products/${editProduct.id}`
      : 'https://api.escuelajs.co/api/v1/products';
    const body = JSON.stringify({
      ...form,
      price: Number(form.price),
      images: [form.images[0]]
    });
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body
      });
      if (!res.ok) throw new Error('Error al guardar producto');
      handleCloseModal();
      // Refrescar productos
      const updated = await fetch('https://api.escuelajs.co/api/v1/products?limit=100&offset=0').then(r => r.json());
      setProducts(updated);
    } catch {
      setError('Error al guardar producto');
    }
  };

  // Borrar producto
  const handleDelete = async id => {
    if (!window.confirm('¿Seguro que deseas borrar este producto?')) return;
    try {
      await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p.id !== id));
    } catch {
      setError('Error al borrar producto');
    }
  };

  if (!isAuthenticated) {
    return <Container className="mt-5"><Alert variant="warning">Debes iniciar sesión para ver los productos.</Alert></Container>;
  }

  return (
    <Container className="mt-5">
      <h2>Administración de Productos</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {user?.role === 'admin' && (
        <Button className="mb-3" onClick={() => handleShowModal()}>Crear producto</Button>
      )}
      {loading ? <Spinner animation="border" /> : (
        <>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Título</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Categoría</th>
              {user?.role === 'admin' && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {currentProducts.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td><img src={product.images?.[0]} alt={product.title} style={{ width: 50, height: 50, objectFit: 'cover' }} /></td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>{product.description}</td>
                <td>{product.category?.name}</td>
                {user?.role === 'admin' && (
                  <td>
                    <Button size="sm" variant="warning" onClick={() => handleShowModal(product)}>Editar</Button>{' '}
                    <Button size="sm" variant="danger" onClick={() => handleDelete(product.id)}>Borrar</Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
        {/* Paginación */}
        <Pagination className="justify-content-center">
          <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={currentPage === i + 1}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
        </>
      )}

      {/* Modal para crear/editar */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editProduct ? 'Editar' : 'Crear'} producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control name="title" value={form.title} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control name="price" type="number" value={form.price} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control name="description" value={form.description} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Imagen (URL)</Form.Label>
              <Form.Control name="images" value={form.images[0]} onChange={e => setForm(f => ({ ...f, images: [e.target.value] }))} required />
            </Form.Group>
            <Button type="submit" variant="primary">Guardar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
} 