# FakeStore App

FakeStore App es una aplicación de catálogo y administración de productos desarrollada en React, ideal para simular una tienda online con gestión local de productos. Permite a usuarios y administradores visualizar, buscar, crear, editar y borrar productos, todo con persistencia en el navegador mediante localStorage.

## Características principales

- **Catálogo de productos** con paginación, búsqueda avanzada (por título, descripción, categoría, ID y comentarios) y visualización de stock.
- **Administración de productos** (solo para administradores): crear, editar y borrar productos desde una interfaz amigable.
- **Carga inicial automática**: si no hay productos, la app descarga datos de la API de Platzi Fake Store y los guarda en localStorage.
- **Gestión de imágenes**: permite subir imágenes por URL o archivo (convertidas a base64).
- **Visualización de stock**: muestra el estado “Agotado” y desactiva la compra si no hay stock.
- **Sincronización automática**: el catálogo y la administración se actualizan en tiempo real si hay cambios en localStorage.
- **Feedback visual**: animaciones y mensajes para mejorar la experiencia de usuario (spinners personalizados, alertas de éxito/error, etc.).
- **Modo offline**: la app funciona completamente sin conexión tras la carga inicial.
- **Exportación/Importación** (opcional): posibilidad de migrar productos entre entornos mediante archivos JSON.

## Roles de usuario

- **Usuario autenticado**: puede ver el catálogo, buscar productos y agregarlos al carrito.
- **Administrador**: además, puede crear, editar y borrar productos tanto desde el catálogo como desde la sección de administración.

## Tecnologías utilizadas

- React
- Bootstrap (para estilos y componentes UI)
- localStorage (persistencia local)
- API Platzi Fake Store (solo para carga inicial)

## Instalación y uso

1. Clona el repositorio y ejecuta `npm install`.
2. Inicia la app con `npm start`.
3. Accede a la app en `http://localhost:3000`.
4. La primera vez, los productos se cargarán automáticamente desde la API externa.
5. Puedes administrar productos desde la sección correspondiente (si eres admin).
