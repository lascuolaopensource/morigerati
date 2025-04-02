import { truncateText } from './utils'

/**
 * Makes text safe for display by truncating and breaking very long words
 * This is especially helpful for handling text that might cause overflow issues
 *
 * @param text - Text to make safe for display
 * @param maxLength - Maximum overall length before truncation
 * @returns Safe-to-display text
 */
export function makeSafeForDisplay(text?: string | null, maxLength = 50): string {
  if (!text) return ''

  // First truncate to the maximum overall length
  const truncated = truncateText(text, maxLength)

  // Then ensure no single word is too long by breaking it
  return truncated
    .split(' ')
    .map((word) => {
      if (word.length > 25) {
        return word.substring(0, 25) + '...'
      }
      return word
    })
    .join(' ')
}
