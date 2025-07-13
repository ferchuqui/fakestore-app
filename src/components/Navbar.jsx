import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import logo from '../assets/logo.png'; // Asegurate de tener este archivo o cambia la ruta

export default function AppNavbar() {
  const { cart } = useContext(CartContext);

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
          </Nav>

          {/* Carrito */}
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/cart">
              🛒 Carrito ({cart.length})
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
