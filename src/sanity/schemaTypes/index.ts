import { type SchemaTypeDefinition } from 'sanity'
import product from './product'

export const schemaTypes = [product]

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product],
}
