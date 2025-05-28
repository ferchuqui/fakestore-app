import Home from './pages/Home';
import CartPage from './pages/CartPage';
import Gracias from './pages/Gracias';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Contacto from './pages/Contacto';


const routes = [
  { path: '/', element: <Home /> },
  { path: '/cart', element: <PrivateRoute><CartPage /></PrivateRoute> },
  { path: '/gracias', element: <Gracias /> },
  { path: '/producto/:id', element: <ProductDetail /> },
  { path: '/login', element: <Login /> },
  { path: '/contacto', element: <Contacto /> }, 
  { path: '*', element: <NotFound /> },
];

export default routes;
