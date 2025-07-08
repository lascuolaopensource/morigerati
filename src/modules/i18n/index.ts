import { getLocale as nextIntlGetLocale } from 'next-intl/server'

const locales = ['it', 'en'] as const

export type Locale = (typeof locales)[number]

export async function getLocale(): Promise<Locale> {
  const locale = await nextIntlGetLocale()
  return locales.includes(locale as Locale) ? (locale as Locale) : 'it'
}
