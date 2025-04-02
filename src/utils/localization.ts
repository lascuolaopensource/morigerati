import { locales, defaultLocale } from '../middleware'

export type Locale = 'it' | 'en'

// Function to check if a locale is valid
export function isValidLocale(locale: string | undefined): locale is Locale {
  return typeof locale === 'string' && locales.includes(locale as Locale)
}

// Function to determine current locale from the URL path
export function getLocaleFromPath(path: string): Locale {
  const pathParts = path.split('/').filter(Boolean)
  const firstPart = pathParts[0]
  return locales.includes(firstPart as Locale) ? (firstPart as Locale) : (defaultLocale as Locale)
}

// Client-side function to set locale in cookie
export function setLocaleCookie(locale: Locale) {
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`
}

// Function to get path with different locale
export function getLocalizedPath(currentPath: string, newLocale: Locale): string {
  const pathParts = currentPath.split('/').filter(Boolean)
  const currentLocale = getLocaleFromPath(currentPath)

  // If the first part is a locale, replace it
  if (locales.includes(pathParts[0] as Locale)) {
    pathParts[0] = newLocale
  } else {
    // Otherwise, prepend the new locale
    pathParts.unshift(newLocale)
  }

  return `/${pathParts.join('/')}`
}
