// src/pages/Login.jsx
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

// Usuarios falsos para demostración
const fakeUsers = [
  {
    email: 'admin@test.com',
    password: 'admin123',
    name: 'Administrador'
  },
  {
    email: 'usuario@test.com',
    password: 'user123',
    name: 'Usuario Normal'
  },
  {
    email: 'cliente@test.com',
    password: 'cliente123',
    name: 'Cliente Premium'
  }
];

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Buscar usuario en la lista de usuarios falsos
    const user = fakeUsers.find(
      u => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      // Login exitoso
      login(user);
      navigate('/cart');
    } else {
      setError('Email o contraseña incorrectos');
    }
  };

  const handleDemoLogin = (email, password) => {
    setFormData({ email, password });
  };

  return (
    <Container className="mt-5 pt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <Card className="shadow" style={{ minWidth: 350 }}>
            <Card.Header
              className="bg-primary text-white text-center"
              style={{ fontSize: 24, padding: '16px 0' }}
            >
              <span role="img" aria-label="user">👤</span> Iniciar Sesión
            </Card.Header>
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit} style={{ minWidth: 250 }}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Tu contraseña"
                    required
                  />
                </Form.Group>

                {error && (
                  <Alert variant="danger" className="mb-3">
                    {error}
                  </Alert>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 mb-3"
                  style={{
                    writingMode: 'horizontal-tb',
                    textAlign: 'center',
                    whiteSpace: 'normal',
                    minWidth: 200,
                    minHeight: 40,
                    fontSize: 18,
                    letterSpacing: 0,
                    display: 'block'
                  }}
                >
                  Iniciar Sesión
                </Button>
              </Form>

              <hr />

              <div className="text-center">
                <h6 className="text-muted mb-3">Usuarios de prueba:</h6>
                <div className="d-grid gap-2">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleDemoLogin('admin@test.com', 'admin123')}
                  >
                    👑 Admin
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleDemoLogin('usuario@test.com', 'user123')}
                  >
                    👤 Usuario Normal
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleDemoLogin('cliente@test.com', 'cliente123')}
                  >
                    ⭐ Cliente Premium
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
}
