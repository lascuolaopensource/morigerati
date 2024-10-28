'use client'
import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import logoBlack from '@/public/logoBlack.png'
import menuIcon from '@/public/hamburger.png'
import x from '@/public/x.png'

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
]

const useBackgroundColor = () => {
  const pathname = usePathname()
  if (pathname.startsWith('/luoghi')) return 'bg-luogoColor'
  if (pathname.startsWith('/itinerari')) return 'bg-itinerarioColor'
  if (pathname.startsWith('/stakeholders')) return 'bg-stakeholderColor'
  if (pathname.startsWith('/residenze')) return 'bg-residenzeColor'
  if (pathname === '/' || pathname.startsWith('/about') || pathname.startsWith('/mobilita'))
    return 'bg-white'
  return 'bg-white'
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const bgColor = useBackgroundColor()

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <>
      <nav className={`w-full ${bgColor} relative`}>
        <div
          className="absolute inset-0 top-[-100vh] -z-10"
          style={{ backgroundColor: 'inherit' }}
        ></div>
        <div className="max-w-7xl mx-auto">
          <div className="py-2 px-6">
            <div className="flex justify-between items-center">
              <div className="w-8"></div>
              <Link href="/" className=" ">
                <LogoGenerator />
              </Link>
              <button
                className="w-8 h-8 flex items-center justify-center z-50"
                onClick={toggleMenu}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <Image
                  src={isMenuOpen ? x : menuIcon}
                  alt={isMenuOpen ? 'Close' : 'Menu'}
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>
        </div>
      </nav>

      {isMenuOpen && (
        <div
          className={`fixed w-screen h-screen inset-0 ${bgColor} text-black z-40 overflow-hidden`}
        >
          <div className="flex flex-col h-full">
            <div className="py-4 px-6 flex-shrink-0">
              <div className="mx-auto max-w-7xl flex justify-between items-center">
                <div className="w-8"></div>
                <div className="flex pl-2 justify-center">
                  <LogoGenerator />
                </div>
                <button
                  onClick={toggleMenu}
                  className="w-8 h-8 pr-10 flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <Image
                    src={menuIcon}
                    alt="Close"
                    width={20}
                    height={20}
                    className="transform rotate-45"
                  />
                </button>
              </div>
            </div>
            <ul className="flex flex-col items-center pt-12 space-y-6 text-2xl overflow-y-auto flex-grow">
              {NAV_ITEMS.map(({ href, text }) => (
                <li key={href}>
                  <Link href={href} className="flex items-center" onClick={toggleMenu}>
                    {pathname.startsWith(href) && (href === '/' ? pathname === '/' : true) && (
                      <span className="mr-2">&rarr;</span>
                    )}
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
