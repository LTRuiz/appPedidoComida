// src/app/page.tsx
import { headers } from 'next/headers'
import { client } from '@/sanity/lib/client'
import { getTenantBySubdomain } from '@/lib/getTenant'
import AppContent from '@/components/AppContent'
import { CartProvider } from '@/context/CartContext'

async function getProducts(tenantId: string) {
  const query = `*[_type == "product" && tenant._ref == $tenantId]{
    "id": _id,
    name,
    price,
    "image": image.asset->url,
    stock,
    category,
    ingredients
  }`
  return await client.fetch(query, { tenantId })
}

export default async function Home() {
  const subdomain = (await headers()).get('x-tenant-subdomain') || 'lucas'
  const tenant = await getTenantBySubdomain(subdomain)
  const products = tenant ? await getProducts(tenant.id) : []

  return (
    <CartProvider>
      <AppContent initialProducts={products} />
    </CartProvider>
  )
}