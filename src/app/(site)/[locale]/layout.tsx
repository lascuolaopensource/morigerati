import { ReactNode } from 'react'
import { getMessages } from '@/utils/getMessages'
import { TranslationProvider } from '@/components/TranslationProvider'
import { Locale, isValidLocale } from '@/utils/localization'
import { locales } from '@/middleware'
import { notFound } from 'next/navigation'

// Validate and generate the dynamic segment
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type LocaleLayoutProps = {
  children: ReactNode
  params: {
    locale: string
  }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  // Check if locale is valid
  if (!isValidLocale(locale)) {
    notFound()
  }

  // Load messages for the current locale
  const messages = await getMessages(locale, ['common', 'residences'])

  return (
    <TranslationProvider locale={locale} messages={messages}>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>
      </div>
    </TranslationProvider>
  )
}
