'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import IG from '@/public/IG.png'
import { renderFooterContent } from '@/utils/footerRenderElement'
import LogoGenerator from '@/components/logoGenerator/logo'
import { SocialIcon } from 'react-social-icons'
import { Locale, getLocaleFromPath } from '@/utils/localization'
import { usePathname } from 'next/navigation'
import { defaultLocale } from '@/middleware'

// Non abbiamo più bisogno di ricevere locale come prop
const Footer = () => {
  const [footer, setFooter] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  // Estrai la locale direttamente dal pathname
  const locale = pathname ? getLocaleFromPath(pathname) : defaultLocale

  // Log per debug
  console.log(`Footer component rendered with locale from pathname: ${locale}`)

  useEffect(() => {
    console.log(`Footer useEffect triggered with locale: ${locale}`)

    const loadFooter = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/footer?locale=${locale}&t=${Date.now()}`, {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' },
        })
        if (!response.ok) {
          throw new Error('Failed to load footer')
        }
        const footerData = await response.json()
        console.log(`Footer data loaded for locale ${locale}:`, footerData)
        setFooter(footerData)
      } catch (error) {
        console.error('Error loading footer:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFooter()
  }, [locale]) // Ricarica quando cambia la lingua

  if (loading) {
    return (
      <footer className="bg-black text-white px-2 py-4" style={{ zIndex: 99999 }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="animate-pulse">Loading... (locale: {locale})</div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-black text-white px-2 py-4" style={{ zIndex: 99999 }}>
      {/* mobile */}
      <div className="sm:hidden max-w-screen-xl mx-auto flex flex-col items-left gap-y-4">
        <div className="flex justify-between">
          <LogoGenerator textColor="white" />
          <div className="flex space-x-2">
            {footer?.['Link Social']?.map((social: { link: string }, index: number) => (
              <SocialIcon
                key={index}
                url={social.link}
                style={{ height: 23, width: 23, filter: 'grayscale(100%)' }}
              />
            ))}
          </div>
        </div>

        <div className="flex-1">
          {footer?.testo_sinistra && renderFooterContent(footer.testo_sinistra)}
        </div>
        <div className="flex-1">
          {footer?.testo_destra && renderFooterContent(footer.testo_destra)}
        </div>
      </div>
      {/* desktop */}
      <div className="hidden sm:flex max-w-screen-xl mx-auto justify-between">
        <LogoGenerator textColor="white" />
        <div className="w-1/4">
          {footer?.testo_sinistra && renderFooterContent(footer.testo_sinistra)}
        </div>
        <div className="w-1/4">
          {footer?.testo_destra && renderFooterContent(footer.testo_destra)}
        </div>
        <div className="flex space-x-2">
          {footer?.['Link Social']?.map((social: { link: string }, index: number) => (
            <SocialIcon
              key={index}
              url={social.link}
              style={{ height: 23, width: 23, filter: 'grayscale(100%)' }}
            />
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
