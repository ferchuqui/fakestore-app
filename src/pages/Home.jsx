import ProductList from '../components/ProductList';
import { Link as ScrollLink } from 'react-scroll';

export default function Home() {
  return (
    <>
      {/* Catálogo de productos */}
      <section id="productos" className="container mt-5">
        <h2 className="mb-4 text-center">Catálogo de Productos</h2>
        <ProductList />
      </section>

      {/* Sección Cómo comprar + Mapa */}
      <section id="comocomprar" className="container mt-5">
        <h2 className="mb-4 text-center">¿Cómo comprar?</h2>

        <div className="row g-4">
          <div className="col-md-3">
            <div className="card h-100 text-center shadow-sm animate-fade">
              <div className="card-body">
                <div className="mb-3">
                  <i className="bi bi-search fs-1 text-primary"></i>
                </div>
                <h5 className="card-title">1. Explorá</h5>
                <p className="card-text">
                  Buscá el producto que más te guste en nuestro catálogo.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card h-100 text-center shadow-sm animate-fade">
              <div className="card-body">
                <div className="mb-3">
                  <i className="bi bi-cart-plus fs-1 text-success"></i>
                </div>
                <h5 className="card-title">2. Agregá al carrito</h5>
                <p className="card-text">
                  Sumalo con un clic y seguí navegando.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card h-100 text-center shadow-sm animate-fade">
              <div className="card-body">
                <div className="mb-3">
                  <i className="bi bi-credit-card fs-1 text-warning"></i>
                </div>
                <h5 className="card-title">3. Finalizá</h5>
                <p className="card-text">
                  Revisá tu pedido y hacé clic en “Finalizar compra”.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card h-100 text-center shadow-sm animate-fade">
              <div className="card-body">
                <div className="mb-3">
                  <i className="bi bi-truck fs-1 text-danger"></i>
                </div>
                <h5 className="card-title">4. Recibí o retiralo</h5>
                <p className="card-text">
                  Coordinamos la entrega o retiro desde nuestra sucursal.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mapa de la sucursal */}
        <div className="mt-5 animate-fade">
          <h3 className="mb-3 text-center">Nuestra Sucursal</h3>
          <p className="text-center">
            Estamos en Calle Curapaligüe 235, Ciudad de Buenos Aires.
          </p>
          <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
            <iframe
              title="Ubicación sucursal"
              src="https://www.google.com/maps?q=Curapaligüe+235,+CABA,+Argentina&output=embed"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
      <section id="contacto" className="container py-5">
  <h2 className="mb-4">Contacto</h2>
  <p>📧 contacto@tuempresa.com</p>
  <p>📱 +54 9 11 3456 7890</p>
  <p>🕒 Lunes a Viernes de 9:00 a 18:00 hs</p>
</section>
    </>
  );
}
