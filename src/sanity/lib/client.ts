import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-04-22',
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
