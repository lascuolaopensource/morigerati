import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines multiple class names with Tailwind's merge function
 * Uses clsx for conditional class application and twMerge to handle Tailwind conflicts
 *
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date string into a localized format
 *
 * @param dateString - ISO date string to format
 * @param locale - Locale to use for formatting (defaults to 'it-IT')
 * @returns Formatted date string
 */
export function formatDate(dateString: string, locale = 'it-IT'): string {
  if (!dateString) return ''

  const date = new Date(dateString)
  let formattedDate = date.toLocaleDateString(locale === 'it' ? 'it-IT' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  // Capitalize month name for Italian locale
  if (locale === 'it-IT') {
    const parts = formattedDate.split(' ')
    if (parts.length > 1) {
      parts[1] = parts[1].charAt(0).toUpperCase() + parts[1].slice(1)
      formattedDate = parts.join(' ')
    }
  }

  return formattedDate
}

/**
 * Truncates a string to a specified length and adds ellipsis if needed
 *
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

/**
 * Safely access nested object properties without throwing errors
 *
 * @param obj - Object to access
 * @param path - Path to the property (e.g., 'user.address.street')
 * @param defaultValue - Default value if property doesn't exist
 * @returns The property value or defaultValue
 */
export function getNestedValue<T, D = undefined>(
  obj: Record<string, any> | null | undefined,
  path: string,
  defaultValue?: D,
): T | D {
  if (!obj) return defaultValue as D

  const keys = path.split('.')
  let result = obj

  for (const key of keys) {
    result = result?.[key]
    if (result === undefined || result === null) {
      return defaultValue as D
    }
  }

  return result as T
}
