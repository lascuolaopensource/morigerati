'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import LogoGenerator from '@/components/logoGenerator/logo'

const NAV_ITEMS = [
  { href: '/', text: 'Home' },
  { href: '/about', text: 'About' },
  { href: '/mobilita', text: 'Mobilità sostenibile' },
  { href: '/luoghi', text: 'Luoghi' },
  { href: '/itinerari', text: 'Itinerari' },
  { href: '/stakeholders', text: 'Stakeholders' },
  { href: '/residenze', text: 'Residenze' },
  { href: '/articoli', text: 'Articoli' },
] as const

const BACKGROUND_COLORS = {
  luoghi: 'bg-luogoColor',
  itinerari: 'bg-itinerarioColor',
  stakeholders: 'bg-stakeholderColor',
  residenze: 'bg-residenzeColor',
  default: 'bg-white',
} as const

const useBackgroundColor = () => {
  const pathname = usePathname()
  const path = pathname.split('/')[1]
  return BACKGROUND_COLORS[path as keyof typeof BACKGROUND_COLORS] || BACKGROUND_COLORS.default
}

const MenuButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
  <button
    className="w-8 h-8 flex items-center justify-center z-50"
    onClick={onClick}
    aria-expanded={isOpen}
    aria-controls="nav-menu"
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
  >
    <div className="relative w-6 h-6">
      <div
        className={`absolute top-1/2 left-1/2 w-5 h-0.5 bg-black transform -translate-x-1/2 transition-transform duration-300 ${
          isOpen ? 'rotate-45' : '-translate-y-1'
        }`}
      />
      <div
        className={`absolute top-1/2 left-1/2 w-5 h-0.5 bg-black transform -translate-x-1/2 transition-opacity duration-300 ${
          isOpen ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <div
        className={`absolute top-1/2 left-1/2 w-5 h-0.5 bg-black transform -translate-x-1/2 transition-transform duration-300 ${
          isOpen ? '-rotate-45' : 'translate-y-1'
        }`}
      />
    </div>
  </button>
)

const NavigationItem = ({
  href,
  text,
  isActive,
  onClick,
}: {
  href: string
  text: string
  isActive: boolean
  onClick: () => void
}) => (
  <li>
    <Link
      href={href}
      className={`flex items-center hover:opacity-70 transition-opacity duration-200 text-2xl ${
        isActive ? 'font-bold' : 'font-normal'
      }`}
      onClick={onClick}
    >
      {isActive && (
        <span className="mr-2" aria-hidden="true">
          &rarr;
        </span>
      )}
      {text}
    </Link>
  </li>
)

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const bgColor = useBackgroundColor()

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen])

  return (
    <>
      <nav className={`w-full ${bgColor} relative z-50`} role="navigation">
        <div
          className="absolute inset-0 top-[-100vh] -z-10"
          style={{ backgroundColor: 'inherit' }}
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto">
          <div className="py-2 px-6">
            <div className="flex justify-between items-center">
              <div className="w-8" aria-hidden="true" />
              <Link href="/" className="">
                <LogoGenerator />
              </Link>
              <MenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" aria-hidden="true" />
        </div>
      </nav>

      {isMenuOpen && (
        <div
          id="nav-menu"
          className={`fixed w-screen h-screen inset-0 ${bgColor} text-black z-40 overflow-hidden`}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex flex-col h-full">
            <div className="invisible py-2 px-6 flex-shrink-0">
              <div className="mx-auto max-w-7xl flex justify-between items-center">
                <div className="w-8" aria-hidden="true" />
                <div className="flex justify-center">
                  <LogoGenerator />
                </div>
                <MenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
              </div>
            </div>
            <nav className="flex-grow">
              <ul className="flex flex-col items-center pt-12 space-y-6 overflow-y-auto">
                {NAV_ITEMS.map(({ href, text }) => (
                  <NavigationItem
                    key={href}
                    href={href}
                    text={text}
                    isActive={pathname.startsWith(href) && (href === '/' ? pathname === '/' : true)}
                    onClick={toggleMenu}
                  />
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
