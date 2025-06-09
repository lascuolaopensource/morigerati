//Boilerplate
import { ReactNode, Suspense } from 'react'
import { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
//CSS
import './globals.css'
//Metadata
import DynamicFavicon from '@/components/uiElements/favicon'
//Ui
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer'
//Locale
import { routing } from '@/i18n/routing'
import { getLocale, getMessages, setRequestLocale } from 'next-intl/server'
//DB
import { loadDb } from '@/modules/utils/db'
import { createMetadata } from '@/modules/seo'

// Validate and generate the dynamic segmentd
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

/* export const metadata: Metadata = {
  title: 'Transluoghi - Ecomuseo del Bussento Contemporaneo',
  description: 'Transluoghi - Ecomuseo del Bussento Contemporaneo',
} */

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = (await getLocale()) as 'en' | 'it'
  const messages = await getMessages()

  // Check if locale is valid and notFound if not
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  setRequestLocale(locale)

  //Import footer data from DB
  const db = await loadDb()
  const footerData = await db.findGlobal({
    slug: 'footer',
    locale: locale,
  })

  return (
    <html lang={locale}>
      <DynamicFavicon />

      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main className="grow flex flex-col">{children}</main>
          <Footer footer={footerData} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata()
}
