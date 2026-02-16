👨‍💻 Autor.

Biron Florez Fuente Estudiante ADSO //ANALISIS Y DESARROLLO DE SOFTWARE. (2977363)

# 📋 Sistema de Facturación Electrónica - Frontend

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat&logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=flat&logo=javascript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.18-38B2AC?style=flat&logo=tailwind-css)

Sistema web para la gestión integral de usuarios con operaciones CRUD completas, desarrollado con **JavaScript**, Next.js 16 y React 19.

---

## 📑 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Reference](#-api-reference)
- [Componentes Principales](#-componentes-principales)
- [Scripts Disponibles](#-scripts-disponibles)
- [Variables de Entorno](#-variables-de-entorno)
- [Guía de Desarrollo](#-guía-de-desarrollo)

---

## ✨ Características

### 🎯 Funcionalidades Principales

- ✅ **CRUD Completo de Usuarios**
  - Crear nuevos usuarios con validación de datos
  - Listar usuarios con filtros avanzados (estado, rol)
  - Buscar usuario específico por ID
  - Actualizar información de usuarios
  - Eliminar usuarios con confirmación

- 🎨 **Interfaz Moderna y Responsiva**
  - Diseño dark mode profesional
  - Animaciones fluidas con Framer Motion
  - Componentes reutilizables con Tailwind CSS
  - Experiencia de usuario optimizada

- 📊 **Dashboard Interactivo**
  - Estadísticas en tiempo real
  - Visualización de usuarios activos
  - Conteo por roles
  - Tabla de últimos usuarios registrados

- 🔍 **Sistema de Filtrado**
  - Filtro por estado (activo/inactivo)
  - Filtro por rol (admin, vendedor, auditor, comprador)
  - Actualización automática cada 3 segundos

- 🔐 **Autenticación (En desarrollo)**
  - Context API para manejo de sesión
  - Página de login con validación
  - Protección de rutas (próximamente)

---

## 🛠️ Tecnologías

### Core

- **[JavaScript ES2022](https://developer.mozilla.org/es/docs/Web/JavaScript)** - Lenguaje de programación principal
- **[Next.js 16.1.6](https://nextjs.org/)** - Framework React con App Router
- **[React 19.2.3](https://react.dev/)** - Biblioteca de UI
- **[Tailwind CSS 4.1.18](https://tailwindcss.com/)** - Framework CSS utility-first

### Dependencias Principales

- **[Framer Motion 12.34.0](https://www.framer.com/motion/)** - Animaciones
- **[Bootstrap 5.3.8](https://getbootstrap.com/)** - Estilos complementarios

### Herramientas de Desarrollo

- **ESLint 9** - Linter de código
- **PostCSS 8.5.6** - Procesador CSS
- **Autoprefixer 10.4.24** - Prefijos CSS automáticos
- **TypeScript 5** - Solo para definiciones de tipos (devDependencies)

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 18.17.0 ([Descargar](https://nodejs.org/))
- **npm** >= 9.0.0 (incluido con Node.js)
- **Git** ([Descargar](https://git-scm.com/))
- **Backend API** ejecutándose en `http://localhost:3000`

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd frontend-react
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:3001**

---

## ⚙️ Configuración

### Configuración del Backend

El frontend se conecta al backend a través de la variable de entorno `NEXT_PUBLIC_API_BASE_URL`. Asegúrate de que tu backend esté corriendo en el puerto especificado.

### Puertos

- **Frontend**: `3001` (configurado en `package.json`)
- **Backend**: `3000` (por defecto)

Si necesitas cambiar el puerto del frontend, modifica el script en `package.json`:

```json
{
  "scripts": {
    "dev": "next dev -p NUEVO_PUERTO"
  }
}
```

---

## 💻 Uso

### Navegación Principal

#### 🏠 Página de Inicio (`/`)

Pantalla de bienvenida con acceso directo al módulo de usuarios.

#### 📊 Dashboard (`/dashboard`)

- Visualización de estadísticas generales
- Total de usuarios registrados
- Usuarios activos vs inactivos
- Distribución por roles
- Tabla de últimos 10 usuarios

#### 👥 Gestión de Usuarios (`/usuarios`)

##### Listado Maestro (`/usuarios`)

- Tabla completa con todos los usuarios
- Filtros por estado (todos, activos, inactivos)
- Filtros por rol (todos, admin, auditor, comprador, vendedor)
- Actualización automática cada 3 segundos
- Diseño estilo terminal con tema oscuro

##### Crear Usuario (`/usuarios/Create`)

**Campos del formulario:**

- Nombre completo
- Correo electrónico (único, requerido)
- Contraseña hash (debe iniciar con "hash")
- Rol (admin, vendedor, auditor, comprador)

##### Buscar por ID (`/usuarios/Id`)

- Búsqueda por ID numérico
- Vista detallada del usuario
- Opción para mostrar/ocultar contraseña hash
- Botón de impresión

##### Actualizar Usuario (`/usuarios/Update`)

- Búsqueda inicial por ID
- Edición de todos los campos
- Toggle de estado activo/inactivo
- Guardado con validación

##### Eliminar Usuario (`/usuarios/Delete`)

- Búsqueda inicial por ID
- Vista previa de datos del usuario
- Confirmación antes de eliminar
- Eliminación definitiva

## 📂 Estructura del Proyecto

```
frontend-react/
│
├── src/
│   ├── app/                        # App Router de Next.js
│   │   ├── api/                    # API Routes (proxy al backend)
│   │   │   └── usuarios/
│   │   │       ├── route.js        # GET, POST /api/usuarios
│   │   │       └── [id]/
│   │   │           └── route.js    # GET, PUT, DELETE /api/usuarios/:id
│   │   │
│   │   ├── dashboard/
│   │   │   └── page.js             # Dashboard con estadísticas
│   │   │
│   │   ├── login/
│   │   │   └── page.js             # Página de login
│   │   │
│   │   ├── usuarios/
│   │   │   ├── page.js             # Listado maestro de usuarios
│   │   │   ├── SubMenuUsuarios.js  # Menú de navegación CRUD
│   │   │   ├── Create/
│   │   │   │   └── page.js         # Formulario de creación
│   │   │   ├── Id/
│   │   │   │   └── page.js         # Búsqueda y visualización por ID
│   │   │   ├── Update/
│   │   │   │   └── page.js         # Búsqueda y actualización
│   │   │   └── Delete/
│   │   │       └── page.js         # Búsqueda y eliminación
│   │   │
│   │   ├── error.js                # Página 404 personalizada
│   │   ├── globals.css             # Estilos globales y Tailwind
│   │   ├── layout.js               # Layout raíz del proyecto
│   │   ├── layout-client.js        # Layout cliente con SubMenu
│   │   └── page.js                 # Página de inicio
│   │
│   ├── components/                 # Componentes reutilizables (JavaScript)
│   │   └── ui/
│   │       ├── button/
│   │       │   ├── BotonAccion.js      # Botón con variantes
│   │       │   ├── BotonActualizar.js  # Botón actualizar
│   │       │   ├── BotonBuscar.js      # Botón buscar
│   │       │   ├── BotonEliminar.js    # Botón eliminar
│   │       │   ├── BotonGuardar.js     # Botón guardar
│   │       │   ├── BotonImprimir.js    # Botón imprimir
│   │       │   └── Button.js           # Botón base
│   │       ├── Input.js                # Input reutilizable
│   │       └── Modal.js                # Modal reutilizable
│   │
│   ├── services/
│   │   └── usuario.service.js      # Servicio API de usuarios
│   │
│   └── utils/
│       └── fecha.js                # Utilidades de formato de fechas
│
├── .env.local                      # Variables de entorno (no versionado)
├── .gitignore                      # Archivos ignorados por Git
├── eslint.config.mjs               # Configuración de ESLint
├── jsconfig.json                   # Configuración de JavaScript (alias @/)
├── next.config.ts                  # Configuración de Next.js
├── package.json                    # Dependencias y scripts
├── package-lock.json               # Lock file de dependencias
├── postcss.config.mjs              # Configuración de PostCSS
└── README.md                       # Este archivo
```

> **Nota:** El proyecto está completamente desarrollado en **JavaScript**. TypeScript solo está presente como devDependency para tipos de Next.js, pero **no se usa para escribir código**.

---

## 🔌 API Reference

### Servicio de Usuarios (`UsuariosAPI`)

El archivo `src/services/usuario.service.js` exporta un objeto con los siguientes métodos:

#### `list(query?)`

Obtiene la lista completa de usuarios.

```javascript
import { UsuariosAPI } from "@/services/usuario.service";

// Obtener todos los usuarios
const usuarios = await UsuariosAPI.list();

// Búsqueda opcional (si el backend lo soporta)
const resultados = await UsuariosAPI.list("juan");
```

**Respuesta esperada:**

```json
[
  {
    "id_usuario": 1,
    "nombre": "Juan Pérez",
    "correo": "juan@example.com",
    "contrasena_hash": "hash_abc123",
    "rol": "admin",
    "activo": 1,
    "creado_en": "2026-01-15T10:30:00Z",
    "actualizado_en": "2026-01-15T10:30:00Z"
  }
]
```

#### `getById(id)`

Obtiene un usuario específico por ID.

```javascript
const usuario = await UsuariosAPI.getById(1);
```

**Respuesta:**

```json
{
  "id_usuario": 1,
  "nombre": "Juan Pérez",
  "correo": "juan@example.com",
  "contrasena_hash": "hash_abc123",
  "rol": "admin",
  "activo": 1,
  "creado_en": "2026-01-15T10:30:00Z",
  "actualizado_en": "2026-01-15T10:30:00Z"
}
```

#### `create(payload)`

Crea un nuevo usuario.

```javascript
const nuevoUsuario = await UsuariosAPI.create({
  nombre: "María López",
  correo: "maria@example.com",
  contrasena_hash: "hash_xyz789",
  rol: "vendedor",
});
```

**Payload requerido:**

```json
{
  "nombre": "string",
  "correo": "string (único)",
  "contrasena_hash": "string (debe iniciar con 'hash')",
  "rol": "admin | vendedor | auditor | comprador"
}
```

#### `update(id, payload)`

Actualiza un usuario existente.

```javascript
await UsuariosAPI.update(1, {
  nombre: "Juan Pérez Actualizado",
  activo: 0,
});
```

#### `remove(id)`

Elimina un usuario.

```javascript
await UsuariosAPI.remove(1);
```

### Manejo de Errores

Todos los métodos lanzan errores que incluyen:

```javascript
try {
  await UsuariosAPI.create(data);
} catch (error) {
  console.error(error.message); // Mensaje legible
  console.error(error.status); // Código HTTP
  console.error(error.data); // Datos adicionales del backend
}
```

---

## 🧩 Componentes Principales

### SubMenuUsuarios

Menú de navegación para el módulo de usuarios con indicador de ruta activa.

```javascript
import SubMenuUsuarios from "@/app/usuarios/SubMenuUsuarios";
```

**Características:**

- Resalta la ruta actual
- Navegación a todas las operaciones CRUD
- Diseño estilo terminal oscuro

### Botones UI

#### BotonBuscar

```javascript
import BotonBuscar from "@/components/ui/button/BotonBuscar";

<BotonBuscar onClick={handleBuscar} disabled={cargando} />;
```

#### BotonGuardar

```javascript
import BotonGuardar from "@/components/ui/button/BotonGuardar";

<BotonGuardar cargando={guardando} />;
```

#### BotonEliminar

```javascript
import BotonEliminar from "@/components/ui/button/BotonEliminar";

<BotonEliminar onClick={handleEliminar} />;
```

#### BotonAccion (Genérico)

```javascript
import BotonAccion from "@/components/ui/button/BotonAccion";

<BotonAccion variant="blue" icon="🔍" onClick={handleClick}>
  Buscar
</BotonAccion>;

// Variantes: blue, emerald, red, gray
```

### Utilidades

#### Formato de Fechas

```javascript
import { formatearFechaLocal, fechaParaInput } from "@/utils/fecha";

// Formato legible: "16/02/2026, 14:30:45"
const fechaLegible = formatearFechaLocal("2026-02-16T14:30:45Z");

// Para inputs type="datetime-local"
const fechaInput = fechaParaInput("2026-02-16T14:30:45Z");
```

---

## 📜 Scripts Disponibles

### `npm run dev`

Inicia el servidor de desarrollo en el puerto 3001.

```bash
npm run dev
```

**Características:**

- Hot reload automático
- Fast Refresh
- Errores en overlay
- Acceso: http://localhost:3001

### `npm run build`

Compila la aplicación para producción.

```bash
npm run build
```

**Genera:**

- Archivos optimizados en `.next/`
- CSS minificado
- JavaScript comprimido
- Imágenes optimizadas

### `npm start`

Inicia el servidor de producción (requiere `npm run build` previamente).

```bash
npm run build
npm start
```

### `npm run lint`

Ejecuta ESLint para detectar problemas de código.

```bash
npm run lint
```

**Revisa:**

- Errores de sintaxis
- Mejores prácticas de React
- Reglas de Next.js
- Código no utilizado

---

## 🔐 Variables de Entorno

### `.env.local`

Crea este archivo en la raíz del proyecto:

```env
# URL base del backend API
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api

# Opcional: Configuraciones adicionales
# NEXT_PUBLIC_APP_NAME=Sistema de Facturación
# NEXT_PUBLIC_DEBUG=true
```

### Variables Públicas

Las variables que comienzan con `NEXT_PUBLIC_` están disponibles en el navegador:

```javascript
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
```

### ⚠️ Importante

- **NO versionar** `.env.local` (está en `.gitignore`)
- **NO incluir** secretos sensibles en variables públicas
- Reiniciar el servidor después de cambios en `.env.local`

---

## 👨‍💻 Guía de Desarrollo

### Crear una Nueva Página

```bash
# Crear carpeta para la ruta
mkdir src/app/mi-pagina

# Crear el componente
touch src/app/mi-pagina/page.js
```

```javascript
// src/app/mi-pagina/page.js
"use client";

export default function MiPagina() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Mi Nueva Página</h1>
    </div>
  );
}
```

Accede en: `http://localhost:3001/mi-pagina`

### Crear un Componente Reutilizable

```javascript
// src/components/ui/MiComponente.js
export default function MiComponente({ titulo, children }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">{titulo}</h2>
      {children}
    </div>
  );
}
```

**Uso:**

```javascript
import MiComponente from "@/components/ui/MiComponente";

<MiComponente titulo="Hola">
  <p>Contenido aquí</p>
</MiComponente>;
```

### Agregar una Nueva API Route

```javascript
// src/app/api/mi-endpoint/route.js
import { NextResponse } from "next/server";

export async function GET() {
  const data = { mensaje: "Hola desde la API" };
  return NextResponse.json(data);
}

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({ recibido: body });
}
```

### Estilos con Tailwind CSS

```javascript
// Clases utilitarias
<div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
  Contenido
</div>

// Responsive
<div className="w-full md:w-1/2 lg:w-1/3">
  Responsive
</div>

// Dark mode
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Dark mode
</div>
```

### Animaciones con Framer Motion

```javascript
import { motion } from "framer-motion";

<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
  Contenido animado
</motion.div>;
```
