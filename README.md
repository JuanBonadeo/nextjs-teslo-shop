# Descripción



## Correr en dev


1. Clonar el repositorio.
2. Crear una copia del ```.env.template``` y renombrarlo a ```.env``` y cambiar las variables de entorno.
3. Instalar dependencias ```npm install```
4. Levantar la base de datos ```docker compose up -d```
5. Correr las migraciones de Primsa ```npx prisma migrate dev```
6. Ejecutar seed ```npm run seed```
7. Correr el proyecto ```npm run dev```
8. Limpiar el localStorage del navegador.





# 🛍️ Next.js Teslo Shop - E-commerce Full Stack

[![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black?logo=next.js)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.7.1-blue?logo=prisma)](https://prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.3-blue?logo=postgresql)](https://www.postgresql.org/)

Aplicación de e-commerce moderna desarrollada con Next.js, PostgreSQL y autenticación con NextAuth. Soporta despliegue local con Docker o en la nube con Neon.

## 🚀 Tecnologías Clave

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes + Server Actions
- **Base de Datos**: PostgreSQL (Docker/Neon) + Prisma ORM
- **Autenticación**: NextAuth.js (Credenciales + OAuth)
- **Estado Global**: Zustand
- **Hosting**: Vercel (Frontend) + Neon (DB)

## 📦 Estructura del Proyecto

```bash
src/
├── app/            # Routing de Next.js
│   ├── (admin)/    # Panel de administración
│   ├── (auth)/     # Autenticación
│   ├── cart/       # Lógica del carrito
│   └── product/    # Páginas de productos
├── components/     # Componentes UI reutilizables
├── lib/            # Lógica compartida
│   ├── actions/    # Server Actions
│   └── prisma/     # Configuración de DB
└── styles/         # Estilos Tailwind
```

## 🛠️ Configuración

### Requisitos Previos
- Node.js 18+
- Docker (para desarrollo local)
- Cuenta en [Neon](https://neon.tech) (para producción)

### Variables de Entorno
Crear archivo `.env` basado en `.env.example`:
```env
# PostgreSQL Local (Docker)
DATABASE_URL="postgresql://user:password@localhost:5432/teslo_shop"

# PostgreSQL en Neon (Producción)
# DATABASE_URL="postgresql://user:password@ep-misty-dawn-123456.us-east-2.aws.neon.tech/teslo_shop?sslmode=require"

# NextAuth
NEXTAUTH_SECRET="tu_secreto"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary (opcional)
CLOUDINARY_URL="cloudinary://..."
```

## 🐳 Ejecución con Docker

1. Iniciar PostgreSQL:
```bash
docker-compose up -d
```

2. Instalar dependencias y ejecutar:
```bash
npm install
npx prisma migrate dev
npm run dev
```

## 🚀 Despliegue en Producción

1. Configurar variables de entorno en Vercel/Neon
2. Las migraciones se aplican automáticamente con:
```bash
npx prisma migrate deploy
```

## 🌟 Características Principales

- Autenticación con credenciales y Google
- Panel de administración
- Carrito de compras persistente
- Búsqueda y filtrado de productos
- Subida de imágenes a Cloudinary
- Modelado de datos con Prisma:
```prisma
model Product {
  id          String   @id @default(uuid())
  title       String
  description String
  price       Float
  slug        String   @unique
  tags        String[]
  gender      Gender
  stock       Int      @default(0)
}
```

## 📄 Licencia
MIT License - Ver [LICENSE](LICENSE) para más detalles.
```

### 📌 Tips Adicionales:
1. Para agregar badges personalizados, puedes usar [shields.io](https://shields.io)
2. Si quieres incluir capturas de pantalla, añade una sección `## 📸 Screenshots` con imágenes en formato Markdown
3. Para mostrar el estado del build, puedes añadir un badge de Vercel:
   ```markdown
   [![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FJuanBonadeo%2Fnextjs-teslo-shop)
   ```
