import type { FieldHook } from 'payload'

export const formatSlug = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, originalDoc, value, ...args }: any) => {
    const locale = args.locale || 'it'
    // For localized fields, we should always use the current locale's value
    // regardless of operation type (create/update)

    // If value is provided directly (user edited the slug field), just format it
    if (typeof value === 'string') {
      return formatSlug(value)
    }

    // Get the current locale value from the fallback field (e.g., 'nome')
    const fallbackData =
      typeof data?.[fallback] === 'object' && data?.[fallback]?.[locale]
        ? data?.[fallback]?.[locale]
        : data?.[fallback]

    if (fallbackData && typeof fallbackData === 'string') {
      return formatSlug(fallbackData)
    }

    // If we're updating and there's no value provided or fallback,
    // preserve the original value from originalDoc if available
    if (operation === 'update' && originalDoc?.slug) {
      // For localized fields, originalDoc.slug might be an object with locale keys
      if (typeof originalDoc.slug === 'object' && originalDoc.slug[locale]) {
        return originalDoc.slug[locale]
      }
      return originalDoc.slug
    }

    return value
  }
