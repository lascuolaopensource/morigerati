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
