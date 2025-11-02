import type { LocalizationConfig } from 'payload'

import { routing } from './routing'

//

const [it, en] = routing.locales

export const localization = {
	defaultLocale: routing.defaultLocale,
	fallback: true,
	locales: [
		{
			code: it,
			label: '🇮🇹',
		},
		{
			code: en,
			label: '🇬🇧',
		},
	],
} as const satisfies LocalizationConfig
