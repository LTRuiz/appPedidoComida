// src/proxy.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname
  const parts = hostname.split('.')
  const isLocalhost = hostname.includes('localhost')

  let subdomain: string | null = null

  if (!isLocalhost && parts.length >= 3) {
    subdomain = parts[0]
  } else if (isLocalhost) {
    subdomain = request.nextUrl.searchParams.get('tenant') || null
  }

  if (pathname.startsWith('/studio') && !subdomain) {
    const adminPassword = request.cookies.get('admin-access')?.value
    if (adminPassword !== process.env.ADMIN_SECRET) {
      return NextResponse.redirect(new URL('/no-access', request.url))
    }
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