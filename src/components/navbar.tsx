'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import logoBlack from '@/public/logoBlack.png'
import hamburger from '@/public/hamburger.png'
import HamburgerMenu from './menu'

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const pathname = usePathname()

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen)
  }

  const getBackgroundColor = (): string => {
    switch (pathname) {
      case '/':
        return 'bg-white'
      case '/about':
        return 'bg-white'
      case '/mobilita':
        return 'bg-white'
      case '/luoghi':
        return 'bg-luogoColor'
      case '/itinerari':
        return 'bg-itinerarioColor'
      case '/stakeholders':
        return 'bg-stakeholderColor'
      default:
        return 'bg-white'
    }
  }

  return (
    <>
      <nav className={`w-full ${getBackgroundColor()} relative`}>
        <div className="max-w-7xl mx-auto">
          <div className="py-4 px-6">
            <div className="flex justify-between items-center">
              <div className="w-8">{/* Spazio vuoto */}</div>
              <Link href="/" className="flex justify-center">
                <Image src={logoBlack} alt="Logo" width={100} />
              </Link>
              <button
                className="w-8 h-8 flex items-center justify-center z-50"
                onClick={toggleMenu}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {!isMenuOpen && <Image src={hamburger} alt="Menu" width={20} />}
              </button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>
        </div>
      </nav>
      <HamburgerMenu isOpen={isMenuOpen} onClose={toggleMenu} currentPath={pathname} />
    </>
  )
}

export default Navbar
