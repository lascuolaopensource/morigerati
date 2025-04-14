import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware(routing)

function getPathWithoutLocale(pathname: string): string {
  const segments = pathname.split('/')
  return '/' + segments.slice(2).join('/')
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const pathWithoutLocale = getPathWithoutLocale(pathname)

  // Get the current locale
  const locale = pathname.split('/')[1] || routing.defaultLocale

  // Get authentication status from cookie
  const token = request.cookies.get('payload-token')
  const isAuthenticated = !!token

  // Check if it's an authed or unauthed route group
  const isAuthedRoute = pathname.includes('/(authed)')
  const isUnauthedRoute = pathname.includes('/(unauthed)')

  // Special case for activities route which should be accessible by both

  // Apply the internationalization middleware
  return await intlMiddleware(request)
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - api (API routes)
    // - _next (Next.js internals)
    // - _vercel (Vercel internals)
    // - admin (Payload CMS admin)
    // - all files in the public folder
    '/((?!api|_next|next|_vercel|admin|ingest|.*\\.).*)',
  ],
}
