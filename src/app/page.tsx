import { client } from '@/sanity/lib/client';
import AppContent from '@/components/AppContent';
import { CartProvider } from '@/context/CartContext';

// Función para traer la data de Sanity
async function getProducts() {
  const query = `*[_type == "product"]{
    "id": _id,
    name,
    price,
    "image": image.asset->url,
    stock,
    category,
    ingredients
  }`;
  return await client.fetch(query);
}

export default async function Home() {
  const products = await getProducts();

  return (
    <CartProvider>
      <AppContent initialProducts={products} />
    </CartProvider>
  );
}