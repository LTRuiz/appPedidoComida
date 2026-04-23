import { type SchemaTypeDefinition } from 'sanity'
import { tenantType } from './tenant'
import product from './product'

export const schemaTypes = [tenantType,  product]

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product],
}
