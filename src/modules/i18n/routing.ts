import createIntlMiddleware from 'next-intl/middleware'
import { defineRouting } from 'next-intl/routing'

//

export const routing = defineRouting({
  locales: ['en', 'de'],
  defaultLocale: 'en',
  localePrefix: 'always',
})

export const intlMiddleware = createIntlMiddleware(routing)
