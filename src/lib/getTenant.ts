// src/lib/getTenant.ts
import { client } from '../sanity/lib/client'
import { urlFor } from '../sanity/lib/image'

export interface TenantConfig {
  id: string
  name: string
  description: string
  whatsapp: string
  logo: string
  primaryColor: string
  secondaryColor: string
}

const TENANT_QUERY = `
  *[_type == "tenant" && subdomain.current == $subdomain && active == true][0] {
    "id": _id,
    name,
    description,
    whatsapp,
    logo,
    primaryColor,
    secondaryColor,
  }
`

const cache = new Map<string, { data: TenantConfig; ts: number }>()
const CACHE_TTL = 1000 * 60 * 5

export async function getTenantBySubdomain(
  subdomain: string
): Promise<TenantConfig | null> {
  const cached = cache.get(subdomain)
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data

  const raw = await client.fetch(TENANT_QUERY, { subdomain })
  if (!raw) return null

  const tenant: TenantConfig = {
    ...raw,
    logo: raw.logo ? urlFor(raw.logo).width(200).url() : '/logos/default.png',
  }

  cache.set(subdomain, { data: tenant, ts: Date.now() })
  return tenant
}