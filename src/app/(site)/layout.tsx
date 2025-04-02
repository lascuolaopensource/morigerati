import type { Metadata } from 'next'
import React, { Suspense } from 'react'
import '../globals.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Footer from '@/components/footer/footer'
import Navbar from '@/components/navbar/navbar'
import DynamicFavicon from '@/components/uiElements/favicon'
import { cookies } from 'next/headers'
import { defaultLocale } from '@/middleware'
import { Locale } from '@/utils/localization'

export const metadata: Metadata = {
  title: 'Transluoghi - Ecomuseo del Bussento Contemporaneo',
  description: 'Transluoghi - Ecomuseo del Bussento Contemporaneo',
}

interface RootLayoutProps {
  children: React.ReactNode
  params?: { locale?: string }
}

export default async function SiteLayout({ children, params }: RootLayoutProps) {
  // Leggiamo la lingua dalla cookie, che viene impostata dal middleware
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('NEXT_LOCALE')
  const locale = (localeCookie?.value || defaultLocale) as Locale

  console.log(`Site layout using locale from cookie: ${locale}`)

  return (
    <div className="min-h-screen overscroll-none">
      <Navbar />
      <main className="">
        <DynamicFavicon />
        <div>{children}</div>
      </main>
      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer />
      </Suspense>
    </div>
  )
}
