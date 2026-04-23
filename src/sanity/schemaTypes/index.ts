import { type SchemaTypeDefinition } from 'sanity'
import { tenantType } from './tenant'
import product from './product'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, tenantType],
}