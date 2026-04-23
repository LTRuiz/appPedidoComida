import { headers } from 'next/headers';
import { getTenantBySubdomain } from '../lib/getTenant';
import { TenantProvider } from '@/context/TenantContext';
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";


export async function generateMetadata(): Promise<Metadata> {
  const subdomain = (await headers()).get('x-tenant-subdomain') || 'lucas'
  const tenant = await getTenantBySubdomain(subdomain)
  return {
    title: tenant?.name || 'Pedidos',
    description: tenant?.description || '',
  }
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const subdomain = (await headers()).get('x-tenant-subdomain') || 'lucas'
  const tenant = await getTenantBySubdomain(subdomain)

  const cssVars = tenant
    ? `
      --color-primary: ${tenant.primaryColor};
      --color-secondary: ${tenant.secondaryColor || '#1A1A1A'};
    `
    : `
      --color-primary: #FF8C00;
      --color-secondary: #1A1A1A;
    `

  return (
    <html lang="es">
      <body>
        <style>{`:root { ${cssVars} }`}</style>
        <div id='modal-root' />
        <TenantProvider tenant={tenant}>
          {children}
        </TenantProvider>
      </body>
    </html>
  )
}
