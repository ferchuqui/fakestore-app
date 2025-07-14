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
    image: '',
    stock: 10
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [success, setSuccess] = useState('');

  // Leer productos desde localStorage
  useEffect(() => {
    setLoading(true);
    const localProducts = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(localProducts);
    setLoading(false);
  }, []);

  // Guardar productos en localStorage
  const saveProducts = (prods) => {
    setProducts(prods);
    localStorage.setItem('products', JSON.stringify(prods));
  };

  // Handlers para crear/editar
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

  // Crear o editar producto en localStorage
  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    let newProducts = [...products];
    if (editProduct) {
      newProducts = newProducts.map(p =>
        p.id === editProduct.id
          ? { ...p, ...form, price: Number(form.price), categoryId: Number(form.categoryId), stock: Number(form.stock), images: [form.image || "https://placehold.co/300x200?text=Sin+Imagen"] }
          : p
      );
    } else {
      const newId = newProducts.length > 0 ? Math.max(...newProducts.map(p => p.id)) + 1 : 1;
      newProducts.push({
        id: newId,
        ...form,
        price: Number(form.price),
        categoryId: Number(form.categoryId),
        stock: Number(form.stock),
        images: [form.image || "https://placehold.co/300x200?text=Sin+Imagen"]
      });
    }
    saveProducts(newProducts);
    setSuccess('Producto cargado con éxito');
    setTimeout(() => setSuccess(''), 2500);
    handleCloseModal();
  };

  // Borrar producto en localStorage
  const handleDelete = id => {
    if (!window.confirm('¿Seguro que deseas borrar este producto?')) return;
    const newProducts = products.filter(p => p.id !== id);
    saveProducts(newProducts);
  };

  const handleDescargarProductos = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://api.escuelajs.co/api/v1/products?limit=100&offset=0');
      const data = await res.json();
      saveProducts(data);
      alert('¡Productos descargados y guardados en localStorage!');
    } catch {
      setError('Error al descargar productos');
    }
    setLoading(false);
  };

  // Paginación frontend
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Función auxiliar para mostrar el nombre de la categoría
  const categoryNames = {
    1: 'Clothes',
    2: 'Electronics',
    3: 'Furniture',
    4: 'Shoes',
    5: 'Others'
  };

  const productosLocales = JSON.parse(localStorage.getItem('products') || '[]');
  const productosDescargados = productosLocales.length > 0;

  if (!isAuthenticated) {
    return <Container className="mt-5"><Alert variant="warning">Debes iniciar sesión para ver los productos.</Alert></Container>;
  }

  return (
    <Container className="mt-5">
      <h2>Administración de Productos</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      {user?.role === 'admin' && (
        <>
          {!productosDescargados && (
            <Button className="mb-3 me-2" variant="success" onClick={handleDescargarProductos}>
              Descargar y guardar productos
            </Button>
          )}
          <Button className="mb-3" onClick={() => handleShowModal()}>
            Crear producto
          </Button>
        </>
      )}
      {loading ? <Spinner animation="border" /> : (
        <>
        <div style={{ minHeight: '700px', transition: 'min-height 0.2s' }}>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Miniatura</th>
                <th>Título</th>
                <th>Precio</th>
                <th>Descripción</th>
                <th>Categoría</th>
                <th>Stock</th>
                {user?.role === 'admin' && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {currentProducts.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    <img src={product.images && product.images[0] ? product.images[0] : 'https://placehold.co/60x40?text=Sin+Imagen'} alt="miniatura" style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }} />
                  </td>
                  <td>{product.title}</td>
                  <td>${product.price}</td>
                  <td>{product.description}</td>
                  <td>{categoryNames[product.categoryId] || product.categoryId}</td>
                  <td>{product.stock ?? 0}</td>
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
        </div>
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
              <Form.Label>Categoría</Form.Label>
              <Form.Select name="categoryId" value={form.categoryId} onChange={handleChange} required>
                <option value={1}>Clothes</option>
                <option value={2}>Electronics</option>
                <option value={3}>Furniture</option>
                <option value={4}>Shoes</option>
                <option value={5}>Others</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cantidad de stock</Form.Label>
              <Form.Control name="stock" type="number" min="0" value={form.stock} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Imagen (archivo)</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setForm(f => ({ ...f, image: reader.result }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {form.image && (
                <img src={form.image} alt="preview" style={{ width: 100, marginTop: 10, borderRadius: 8 }} />
              )}
            </Form.Group>
            <Button type="submit" variant="primary">Guardar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
} 