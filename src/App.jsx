import { Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Gracias from './pages/Gracias';
import Contacto from './pages/Contacto';
import AdminProducts from './pages/AdminProducts';

function App() {
  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gracias" element={<Gracias />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/admin-products" element={<AdminProducts />} />
        <Route path="*" element={<NotFound />} />
        
        {/* Aquí puedes agregar más rutas según sea necesario */}
      </Routes>
    </>
  );
}

export default App;