import { getLocale as nextIntlGetLocale } from 'next-intl/server'

export async function getLocale() {
  const locale = await nextIntlGetLocale()
  return locale as 'it' | 'en'
}
