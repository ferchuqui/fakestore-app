import { useState } from 'react';

export default function Contacto() {
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    const response = await fetch('https://formspree.io/f/mayvzxyz', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    });

    if (response.ok) {
      setStatus('success');
      form.reset();
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4">Contacto</h2>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <p>📧 Correo: <a href="mailto:contacto@tuempresa.com">contacto@tuempresa.com</a></p>
          <p>📱 WhatsApp: <a href="https://wa.me/5491134567890" target="_blank" rel="noopener noreferrer">+54 9 11 3456 7890</a></p>
          <p>🕒 Horarios: Lunes a Viernes de 9:00 a 18:00 hs</p>

          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input type="text" className="form-control" id="nombre" name="nombre" required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email" required />
            </div>
            <div className="mb-3">
              <label htmlFor="mensaje" className="form-label">Mensaje</label>
              <textarea className="form-control" id="mensaje" name="mensaje" rows="4" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Enviar</button>
          </form>

          {status === 'success' && (
            <div className="alert alert-success mt-3">✅ ¡Mensaje enviado con éxito!</div>
          )}
          {status === 'error' && (
            <div className="alert alert-danger mt-3">❌ Hubo un error. Inténtalo de nuevo.</div>
          )}
        </div>
      </div>
    </div>
  );
}
