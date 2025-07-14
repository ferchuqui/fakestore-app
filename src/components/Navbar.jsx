import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import logo from '../assets/logo.png'; // Asegurate de tener este archivo o cambia la ruta
import { useState } from 'react';

export default function AppNavbar() {
  const { cart } = useContext(CartContext);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        {/* Logo y nombre */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
            alt="Logo"
          />
          2026 - El futuro llego para quedarse        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-content" />
        <Navbar.Collapse id="navbar-content">
          {/* Ítems con scroll suave */}
          <Nav className="mx-auto gap-4">
            {isHomePage ? (
              <ScrollLink
                to="productos"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="nav-link"
                style={{ cursor: 'pointer' }}
              >
                Productos
              </ScrollLink>
            ) : (
              <Nav.Link as={Link} to="/#productos">
                Productos
              </Nav.Link>
            )}

            {isHomePage ? (
              <ScrollLink
                to="comocomprar"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="nav-link"
                style={{ cursor: 'pointer' }}
              >
                Cómo comprar
              </ScrollLink>
            ) : (
              <Nav.Link as={Link} to="/#comocomprar">
                Cómo comprar
              </Nav.Link>
            )}

            {isHomePage ? (
              <ScrollLink
                to="contacto"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="nav-link"
                style={{ cursor: 'pointer' }}
              >
                Contacto
              </ScrollLink>
            ) : (
              <Nav.Link as={Link} to="/#contacto">
                Contacto
              </Nav.Link>
            )}
          </Nav>

          {/* Carrito y Login/Usuario */}
          <Nav className="ms-auto">
            {isAuthenticated && user ? (
              <Dropdown
                className="me-3"
                show={showDropdown}
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <Dropdown.Toggle variant="outline-primary" id="dropdown-user">
                  {user.picture && (
                    <img src={user.picture} alt="avatar" style={{ width: 32, height: 32, borderRadius: '50%', marginRight: 8, objectFit: 'cover', verticalAlign: 'middle' }} />
                  )}
                  {user.name}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ minWidth: 220, padding: 16 }}>
                  <div className="text-center">
                    {user.picture && (
                      <img
                        src={user.picture}
                        alt="avatar"
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: '50%',
                          marginBottom: 8,
                          objectFit: 'cover',
                          border: '2px solid #007bff'
                        }}
                      />
                    )}
                    <div style={{ fontWeight: 'bold', fontSize: 16 }}>{user.name}</div>
                    <div style={{ fontSize: 14, color: '#555' }}>{user.email}</div>
                  </div>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout} className="text-center">
                    🚪 Cerrar Sesión
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link as={Link} to="/login" className="me-3">
                👤 Iniciar Sesión
              </Nav.Link>
            )}
            {user?.role === 'admin' && (
              <Nav.Link as={Link} to="/admin-products" className="me-3">
                🛠️ Admin Productos
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/cart">
              🛒 Carrito ({cart.length})
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
