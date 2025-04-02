import { loadDb } from './db'
import type { Locale } from './localization'
import { Globals } from '@/db/globals'

/**
 * Fetches a global document by slug
 *
 * @param slug - The slug of the global to fetch
 * @param locale - Optional locale to fetch the document in
 * @returns The global document
 */
export async function fetchGlobalData<T = any>(slug: Globals, locale?: Locale): Promise<T> {
  const db = await loadDb()
  const result = await db.findGlobal({ slug, locale })
  return result as unknown as T
}

/**
 * Fetches collection items with optional filtering
 *
 * @param collection - The collection to fetch from
 * @param options - Options for filtering and pagination
 * @returns The collection documents
 */
export async function fetchCollectionData<T = any>(
  collection: string,
  options: {
    depth?: number
    limit?: number
    page?: number
    sort?: string
    where?: any // Filter query
    locale?: Locale
  } = {},
): Promise<{
  docs: T[]
  totalDocs: number
  totalPages: number
  page: number
  hasPrevPage: boolean
  hasNextPage: boolean
}> {
  const { depth = 1, limit = 100, page = 1, sort, where, locale } = options

  const db = await loadDb()
  // Use the collection parameter as a string directly
  const result = await db.find({
    collection: collection as any,
    depth,
    limit,
    page,
    sort,
    where,
    locale,
  })

  return result as unknown as {
    docs: T[]
    totalDocs: number
    totalPages: number
    page: number
    hasPrevPage: boolean
    hasNextPage: boolean
  }
}

/**
 * Fetches a single collection item by slug
 *
 * @param collection - The collection to fetch from
 * @param slug - The slug of the item to fetch
 * @param depth - Depth of relationship population
 * @param locale - Optional locale to fetch the item in
 * @returns The collection item or null if not found
 */
export async function fetchItemBySlug<T = any>(
  collection: string,
  slug: string,
  depth = 2,
  locale?: Locale,
): Promise<T | null> {
  const result = await fetchCollectionData<T>(collection, { depth, locale })

  // Handle both regular slugs and localized slug objects
  const item = result.docs.find((doc: any) => {
    // Check if the slug is an object with locale keys (for localized slugs)
    if (typeof doc.slug === 'object' && doc.slug !== null && locale) {
      return doc.slug[locale] === slug
    }
    // Regular string slug
    return doc.slug === slug
  })

  return item || null
}

/**
 * Fetches a single collection item by ID
 *
 * @param collection - The collection to fetch from
 * @param id - The ID of the item to fetch
 * @param depth - Depth of relationship population
 * @param locale - Optional locale to fetch the item in
 * @returns The collection item or null if not found
 */
export async function fetchItemById<T = any>(
  collection: string,
  id: string,
  depth = 2,
  locale?: Locale,
): Promise<T | null> {
  const db = await loadDb()

  try {
    const item = await db.findByID({ collection: collection as any, id, depth, locale })

    return item as T
  } catch (error) {
    console.error(`Error fetching ${collection} by ID:`, error)
    return null
  }
}
