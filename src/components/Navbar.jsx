import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../assets/logo.png'; // Asegurate de tener el logo en esta ruta

export default function AppNavbar() {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#inicio">
          <img
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
            alt="Logo"
          />
          Tu Empresa
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-content" />
        <Navbar.Collapse id="navbar-content">
          <Nav className="ms-auto">
            <Nav.Link href="#inicio">Inicio</Nav.Link>
            <Nav.Link href="#productos">Productos</Nav.Link>
            <Nav.Link href="#comocomprar">Cómo comprar</Nav.Link>
            <Nav.Link href="#contacto">Contacto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}