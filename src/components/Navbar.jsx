import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../assets/logo.png';

export default function AppNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
            alt="Logo"
          />
        2026.com.ar
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#productos">Productos</Nav.Link>
            <Nav.Link href="#carrito">Carrito</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}