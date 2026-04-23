// src/middleware.ts  (en la raíz del proyecto, al lado de package.json)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''

  // Extrae el subdominio
  // "pizzeria.tuapp.com" → "pizzeria"
  // "localhost:3000" → null (usa tenant por defecto)
  const parts = hostname.split('.')
  const isLocalhost = hostname.includes('localhost')

  let subdomain: string | null = null

  if (!isLocalhost && parts.length >= 3) {
    subdomain = parts[0]
  } else if (isLocalhost) {
    subdomain = request.nextUrl.searchParams.get('tenant') || 'lucas'
  }

  const response = NextResponse.next()

  if (subdomain) {
    response.headers.set('x-tenant-subdomain', subdomain)
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|logos/).*)'],
}