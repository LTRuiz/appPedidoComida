# 🍔 App — Comida Rápida

Aplicación web para pedidos de comida rápida, desarrollada con **Next.js 14**. Permite a los clientes armar su pedido y enviarlo directamente por **WhatsApp**, con soporte para delivery o retiro en local.

---

## ✨ Características

- 🛒 Carrito de compras interactivo con sidebar deslizante
- 📱 Envío de pedidos por WhatsApp con un solo tap
- 🎠 Carrusel hero en la página principal
- 🃏 Tarjetas de productos con detalle y precio
- 🌍 Soporte para delivery y retiro en local
- ⚡ Interfaz rápida y responsiva con Next.js App Router

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| [Next.js 14](https://nextjs.org/) | Framework principal (App Router) |
| [React](https://react.dev/) | UI y componentes |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático |
| [Tailwind CSS](https://tailwindcss.com/) | Estilos |
| [Context API](https://react.dev/reference/react/createContext) | Estado global del carrito |

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx       # Layout raíz con Footer
│   └── page.tsx         # Página principal
├── components/
│   ├── CartSidebar.tsx  # Sidebar del carrito de compras
│   ├── Footer.tsx       # Pie de página
│   ├── Header.tsx       # Barra de navegación
│   ├── HeroCarrusel.tsx # Carrusel principal
│   └── ProductCard.tsx  # Tarjeta de producto
├── context/
│   └── CartContext.tsx  # Contexto global del carrito
├── data/
│   └── menu.ts          # Datos del menú
└── utils/
    └── whatsapp.ts      # Lógica de envío por WhatsApp
```

---

## 🚀 Instalación y Uso

### Requisitos previos

- Node.js 18+
- npm o yarn

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editá .env.local con tu número de WhatsApp

# 4. Iniciar el servidor de desarrollo
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## ⚙️ Variables de Entorno

Creá un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=5491100000000
```

> Reemplazá el número con el tuyo en formato internacional (sin `+` ni espacios).

---

## 📦 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Análisis de código con ESLint
```

---

## 🛒 ¿Cómo funciona el pedido?

1. El cliente navega el menú y agrega productos al carrito.
2. El carrito lateral muestra el resumen con totales.
3. Al confirmar, se genera un mensaje formateado automáticamente.
4. El cliente es redirigido a WhatsApp con el pedido listo para enviar.

---

## 🤝 Contribuir

1. Hacé un fork del repositorio.
2. Creá una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. Commiteá tus cambios: `git commit -m 'feat: agrega nueva funcionalidad'`
4. Pusheá la rama: `git push origin feature/nueva-funcionalidad`
5. Abrí un Pull Request.

---

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).
