/**
 * Formats a date based on the specified locale
 * @param date The date to format (can be Date, string, null, or undefined)
 * @param locale The locale to use for formatting (default: 'it')
 * @param includeTime Whether to include time in the formatted date (default: false)
 * @param fullLocale The full locale object for additional formatting options (optional)
 * @returns A formatted date string
 */
export function formatDate(
  date: Date | string | null | undefined,
  locale: string = 'it',
  includeTime: boolean = false,
  fullLocale?: any,
): string {
  // Return empty string if date is null or undefined
  if (date === null || date === undefined) {
    return ''
  }

  // Convert string to Date if needed
  const dateObj = typeof date === 'string' ? new Date(date) : date

  // Map to correct locale codes
  const localeMap: Record<string, string> = {
    it: 'it-IT',
    en: 'en-GB', // Using en-GB for European date format (day/month/year)
  }

  // Get the correctly formatted locale
  const formattedLocale = localeMap[locale] || 'it-IT'

  // Format options
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }

  // Add time to options if requested
  if (includeTime) {
    options.hour = '2-digit'
    options.minute = '2-digit'
  }

  // Format the date
  let formattedDate = dateObj.toLocaleDateString(formattedLocale, options)

  // Capitalize month name for Italian locale
  if (locale === 'it') {
    const parts = formattedDate.split(' ')
    if (parts.length > 1) {
      parts[1] = parts[1].charAt(0).toUpperCase() + parts[1].slice(1)
      formattedDate = parts.join(' ')
    }
  }

  return formattedDate
}

// Also export as default for compatibility with existing imports
export default formatDate
