import { getLocale as nextIntlGetLocale } from 'next-intl/server'

const locales = ['it', 'en']

export type Locale = 'it' | 'en'

export async function getLocale(): Promise<Locale> {
  const locale = await nextIntlGetLocale()
  return locales.includes(locale) ? (locale as Locale) : 'it'
}
