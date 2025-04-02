import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '@/middleware'

export const getTranslations = async (locale: string, namespaces: string[]) => {
  if (!locales.includes(locale)) notFound()

  const messages = await Promise.all(
    namespaces.map(async (namespace) => {
      try {
        const messages = await import(`@/messages/${locale}/${namespace}.json`)
        return messages
      } catch (error) {
        console.error(`Error loading translations for namespace ${namespace}:`, error)
        return {}
      }
    }),
  )

  const translations = messages.reduce(
    (acc, curr, index) => {
      acc[namespaces[index]] = curr[namespaces[index]]
      return acc
    },
    {} as Record<string, any>,
  )

  return (key: string) => {
    const keys = key.split('.')
    let value: any = translations
    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) return key
    }
    return value
  }
}
