import Home from './pages/Home';
import AppNavbar from './components/Navbar'; // ← también corregí el path, debe ser en minúsculas

function App() {
  return (
    <>
      <AppNavbar />
      <h1 className="text-center mt-4">Productos de Primera Puerta a Puerta</h1>
      <Home />
    </>
  );
}

export default App;