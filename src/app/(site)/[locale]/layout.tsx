import { ReactNode, Suspense } from 'react'
import { notFound } from 'next/navigation'
import localization from '@/i18n/localization'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import DynamicFavicon from '@/components/uiElements/favicon'
import Navbar from '@/components/navbar/navbar'
import Footer from '@/components/footer/footer'
import { Metadata } from 'next'
// Validate and generate the dynamic segmentd
export function generateStaticParams() {
  return localization.locales.map((locale) => ({ locale }))
}
export const metadata: Metadata = {
  title: 'Transluoghi - Ecomuseo del Bussento Contemporaneo',
  description: 'Transluoghi - Ecomuseo del Bussento Contemporaneo',
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
  if (!localization.locales.some((l) => l.code === locale)) {
    notFound()
  }

  // Load messages for the current locale
  const messages = await getMessages({
    locale,
  })

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="min-h-screen overscroll-none">
        <Navbar />
        <div className="flex flex-col min-h-screen">
          <main className="">
            <DynamicFavicon />
            <div>{children}</div>
          </main>
        </div>
        <Suspense fallback={<div>Loading footer...</div>}>
          <Footer />
        </Suspense>
      </div>
    </NextIntlClientProvider>
  )
}
