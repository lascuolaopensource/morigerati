import { NextRequest, NextResponse } from 'next/server'

// Define our supported locales
export const locales = ['it', 'en']
export const defaultLocale = 'it'

// Define what paths should not be handled by locale routing
export const localePrefix = 'always' // 'as-needed' or 'always'
const publicRoutes = ['/api', '/_next', '/admin', '/favicon.ico', '/media']

export function middleware(request: NextRequest) {
  // Debug logging

  // Check if the pathname should be excluded from locale routing
  const { pathname } = request.nextUrl

  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Check if this is a locale-prefixed path
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  // Se il percorso contiene già una locale, estrai e imposta il cookie
  if (pathnameHasLocale) {
    const locale = pathname.split('/')[1]
    console.log(`Detected locale in URL: ${locale}`)

    // Crea una risposta che continua alla prossima middleware
    const response = NextResponse.next()

    // Imposta il cookie con la locale
    response.cookies.set('NEXT_LOCALE', locale, { path: '/', sameSite: 'strict' })

    return response
  }

  // Try to get locale from cookies
  let locale = defaultLocale
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value

  if (cookieLocale && locales.includes(cookieLocale)) {
    locale = cookieLocale
  } else {
    // Get locale from Accept-Language header
    const acceptLanguageHeader = request.headers.get('Accept-Language') || ''

    if (acceptLanguageHeader) {
      try {
        // Parse the Accept-Language header manually
        const userLanguages = acceptLanguageHeader
          .split(',')
          .map((lang) => lang.split(';')[0].trim())

        // Find the first language that matches our supported locales
        const preferredLanguage = userLanguages.find(
          (lang) => locales.includes(lang) || locales.includes(lang.split('-')[0]),
        )

        if (preferredLanguage) {
          // If we found a full match like 'en-US', use the base language
          locale = preferredLanguage.includes('-')
            ? preferredLanguage.split('-')[0]
            : preferredLanguage

          // Make sure it's one of our supported locales
          if (!locales.includes(locale)) {
            locale = defaultLocale
          }
        }
      } catch (e) {
        console.error('Error parsing Accept-Language header:', e)
      }
    }
  }

  // Debug logging

  // Redirect to locale path
  const newUrl = new URL(
    `/${locale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`,
    request.url,
  )
  newUrl.search = request.nextUrl.search

  const response = NextResponse.redirect(newUrl)

  // Imposta il cookie anche nella risposta di reindirizzamento
  response.cookies.set('NEXT_LOCALE', locale, { path: '/', sameSite: 'strict' })

  return response
}

export const config = { matcher: ['/((?!api|_next/static|_next/image|admin|favicon.ico|media).*)'] }
