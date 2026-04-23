'use client'

import { createContext, useContext } from 'react'
import type { TenantConfig } from '../lib/getTenant'

const TenantContext = createContext<TenantConfig | null>(null)

export function TenantProvider({
  tenant,
  children,
}: {
  tenant: TenantConfig | null
  children: React.ReactNode
}) {
  return (
    <TenantContext.Provider value={tenant}>
      {children}
    </TenantContext.Provider>
  )
}

export function useTenant() {
  const ctx = useContext(TenantContext)
  return ctx
}