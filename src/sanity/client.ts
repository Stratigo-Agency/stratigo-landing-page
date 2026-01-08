import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: true
})

const builder = imageUrlBuilder(client)

/**
 * Generate optimized image URL from Sanity
 * Automatically converts to WebP for browsers that support it
 * Falls back to original format for older browsers
 */
export function urlFor(source: SanityImageSource) {
  return builder
    .image(source)
    .auto('format') // Automatically serve WebP when browser supports it
    .quality(80)    // Good balance between quality and file size
}

