'use client'

import { createContext, useContext, ReactNode } from 'react'
import { Locale } from '@/utils/localization'

interface TranslationContextType {
  locale: Locale
  messages: Record<string, any>
  t: (key: string, defaultValue?: string) => string
}

const TranslationContext = createContext<TranslationContextType | null>(null)

interface TranslationProviderProps {
  locale: Locale
  messages: Record<string, any>
  children: ReactNode
}

export function TranslationProvider({ locale, messages, children }: TranslationProviderProps) {
  // Function to get a translated message by key
  const t = (key: string, defaultValue: string = '') => {
    // If the key includes a namespace (e.g., 'residences:title')
    if (key.includes(':')) {
      const [namespace, messageKey] = key.split(':')
      const namespaceObj = messages[namespace]
      if (!namespaceObj) return defaultValue || key

      // For nested keys (e.g., 'residences:details.startDate')
      const keyParts = messageKey.split('.')
      let result = namespaceObj
      for (const part of keyParts) {
        if (result && typeof result === 'object' && part in result) {
          result = result[part]
        } else {
          return defaultValue || key
        }
      }

      return result || defaultValue || key
    }

    // If no namespace is specified, use 'common' as default
    const keyParts = key.split('.')
    let result = messages.common
    for (const part of keyParts) {
      if (result && typeof result === 'object' && part in result) {
        result = result[part]
      } else {
        return defaultValue || key
      }
    }

    return result || defaultValue || key
  }

  return (
    <TranslationContext.Provider value={{ locale, messages, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

// Hook to use translations in components
export function useTranslation() {
  const context = useContext(TranslationContext)

  if (context === null) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }

  return context
}
