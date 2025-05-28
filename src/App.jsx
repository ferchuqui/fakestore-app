import { Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import NotFound from './pages/NotFound';
import Gracias from './pages/Gracias';
import Contacto from './pages/Contacto';

function App() {
  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/gracias" element={<Gracias />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/contacto" element={<Contacto />} />
        {/* Aquí puedes agregar más rutas según sea necesario */}
      </Routes>
    </>
  );
}

export default App;