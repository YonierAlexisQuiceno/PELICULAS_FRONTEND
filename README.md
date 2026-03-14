# 🎬 PELICULAS_FRONTEND (AppMedia)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

## 📖 Descripción del Proyecto
Este es el frontend del **Proyecto Películas**, un dashboard administrativo moderno desarrollado en **React** y **Vite**. Ha sido diseñado para gestionar de manera integral el catálogo audiovisual de una plataforma multimedia. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los módulos principales del ecosistema: **Géneros, Directores, Productoras, Tipos y Contenido Media**. 

La interfaz cuenta con un rediseño estilizado en tema oscuro, utilizando componentes avanzados y visualización de datos dinámica para una experiencia de usuario óptima.

---

## 📑 Tabla de Contenidos
- [Tecnologías y Librerías Utilizadas](#-tecnologías-y-librerías-utilizadas)
- [Módulos y Funcionalidades](#-módulos-y-funcionalidades)
- [Instalación y Configuración Local](#-instalación-y-configuración-local)
- [Scripts Adicionales](#-scripts-adicionales)
- [Desarrollado por](#-desarrollado-por)

---

## 🛠 Tecnologías y Librerías Utilizadas
El proyecto se basa en las siguientes tecnologías principales, configuradas dentro de un entorno rápido impulsado por Vite:
- **[React 19](https://react.dev/)**: Biblioteca para el desarrollo interactivo de interfaces web.
- **[Vite 8](https://vitejs.dev/)**: Empaquetador y servidor de desarrollo ultrarrápido.
- **[React Router DOM](https://reactrouter.com/)**: Para la navegación y enrutamiento entre las vistas del panel.
- **[Axios](https://axios-http.com/)**: Cliente HTTP basado en promesas utilizado para conectar con la API RESTful (Backend PROYECTO_PELICULAS).
- **[Bootstrap 5](https://getbootstrap.com/)**: Herramienta CSS para layouts responsivos y estilos de componentes rápidos.
- **[Recharts](https://recharts.org/)**: Para la visualización de gráficos interactivos y análisis de datos en el Dashboard principal.
- **[SweetAlert2](https://sweetalert2.github.io/)**: Para la generación de ventanas modales y notificaciones de acciones elegantes (alertas de éxito, error, confirmación).
- **[React Icons](https://react-icons.github.io/react-icons/)**: Colección de íconos que provee indicadores visuales a lo largo de las tablas, botones y formularios.

---

## 🧩 Módulos y Funcionalidades
El dashboard cuenta con las siguientes secciones principales accesibles desde el menú lateral:
1. 📊 **Dashboard Principal**: Una vista analítica inicial que muestra métricas rápidas y distribución de datos a través de gráficos.
2. 🎬 **Gestión de Medios**: Panel central para dar de alta películas o series. Vincula registros previos de directores, géneros, tipos y productoras.
3. 🎥 **Mantenimiento de Directores**: Registro y actualización de información de los directores vinculados a los medios.
4. 🎭 **Mantenimiento de Géneros**: Categorías temáticas (Acción, Drama, Terror, etc.) en las que se clasifican los contenidos.
5. 🏢 **Mantenimiento de Productoras**: Gestión de las compañías responsables de la producción, su eslogan y sitio web.
6. 📺 **Mantenimiento de Tipos**: Diferenciación de los formatos de los contenidos (Películas, Series, Documentales, etc.).

---

## 🚀 Instalación y Configuración Local

### 1. Requisitos Previos
- Node.js instalado (v18 o superior recomendado).
- Tener en ejecución en local o en la nube el backend/API de PROYECTO_PELICULAS.

### 2. Pasos de Instalación
Clona el repositorio o ubícate en la carpeta principal del frontend:
```bash
pwd
```

Instala todas las dependencias del proyecto utilizando npm:
```bash
npm install
```

### 3. Ejecutar entorno de Desarrollo
Para arrancar el servidor de desarrollo, ejecuta el script principal alojado en el `package.json`:
```bash
npm run dev
```
La aplicación estará disponible por defecto en: `http://localhost:5173` o el puerto que te indique la terminal. *(Si usas componentes que apuntan al backend, asegúrate de que esté configurado apuntando a la URL correcta, generalmente a través de la configuración de base URl en tu cliente de `axios`)*.

---

## 📜 Scripts Adicionales
- `npm run build`: Prepara la aplicación para su despliegue en producción construyendo un directorio optimizado en `dist/`.
- `npm run lint`: Examina y verifica problemas estáticos en el código js/jsx utilizando ESLint.
- `npm run preview`: Ejecuta un servidor local ligero que levanta la versión recién empaquetada de `dist/` para verificar cómo se comportará antes de enviarse a producción.

---

## 👨‍💻 Desarrollado por
**Yonier Alexis Quiceno**  
**Jonathan Alvarez Bustamante** 
Proyecto Integrador II - Páginas WEB (2026)  
IU Digital de Antioquia
