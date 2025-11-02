import type { NextRequest } from 'next/server'

import { intlMiddleware } from './modules/i18n/routing'

//

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
