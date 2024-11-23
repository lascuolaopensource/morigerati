import type { Metadata } from 'next'
import React, { Suspense } from 'react'
import '../globals.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Footer from '@/components/footer/footer'
import Navbar from '@/components/navbar/navbar'
import DynamicFavicon from '@/components/uiElements/favicon'

export const metadata: Metadata = {
  title: 'Transluoghi - Ecomuseo del Bussento Contemporaneo',
  description: 'Transluoghi - Ecomuseo del Bussento Contemporaneo',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className="overscroll-none">
      <body className="min-h-screen overscroll-none">
        <Navbar />
        <main className="bg-white">
          <DynamicFavicon />
          <div>{children}</div>
        </main>
        <Suspense fallback={<div>Loading footer...</div>}>
          <Footer />
        </Suspense>
      </body>
    </html>
  )
}
