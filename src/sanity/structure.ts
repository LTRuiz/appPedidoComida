import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S, context) => {
  const hostname = typeof window !== 'undefined' ? window.location.hostname : ''
  const parts = hostname.split('.')
  const isLocalhost = hostname.includes('localhost')


  const params = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search)
    : null
  const tenantSubdomain = isLocalhost
    ? params?.get('tenant') || null
    : parts.length >= 3 ? parts[0] : null


  if (tenantSubdomain) {
    return S.list()
      .title('Mi negocio')
      .items([
        S.listItem()
          .title('Mis Productos')
          .child(
            S.documentList()
              .title('Mis Productos')
              .filter('_type == "product" && tenant->subdomain.current == $subdomain')
              .params({ subdomain: tenantSubdomain })
          ),
      ])
  }

  return S.list()
    .title('Admin')
    .items([
      S.documentTypeListItem('tenant').title('Clientes'),
      S.divider(),
      S.documentTypeListItem('product').title('Todos los productos'),
    ])
}