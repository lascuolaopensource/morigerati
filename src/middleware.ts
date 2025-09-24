import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './modules/i18n/routing'

//

const intlMiddleware = createIntlMiddleware(routing)

export async function middleware(request: NextRequest) {
  return intlMiddleware(request)
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
