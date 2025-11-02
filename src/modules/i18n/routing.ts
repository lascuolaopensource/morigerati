import createIntlMiddleware from 'next-intl/middleware'
import { defineRouting } from 'next-intl/routing'

//

export const routing = defineRouting({
	locales: ['it', 'en'],
	defaultLocale: 'it',
	localePrefix: 'always',
})

export const intlMiddleware = createIntlMiddleware(routing)
