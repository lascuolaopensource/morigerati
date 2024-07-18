'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logoBlack from '@/public/logoBlack.png'
import logo from '@/public/logo.png'
import hamburger from '@/public/hamburger.png'

interface NavbarProps {
  backgroundColor: string
  currentPage: string
}

const Navbar: React.FC<NavbarProps> = ({ backgroundColor, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen)
  }

  const renderPageLink = (href: string, text: string): JSX.Element => {
    return (
      <Link href={href} className="flex items-center">
        {currentPage === href && <span className="mr-2">&rarr;</span>}
        {text}
      </Link>
    )
  }

  return (
    <div className="mx-auto max-w-xl">
      <nav className={`w-full ${backgroundColor} relative `}>
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

        {/* Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black text-white z-40 mx-auto max-w-xl">
            <div className="absolute top-0 left-0 right-0 py-4 px-6 flex justify-between items-center">
              <div className="w-8"></div>
              <div className="flex justify-center">
                <Image src={logo} alt="Logo" width={100} />
              </div>
              <button
                onClick={toggleMenu}
                className="w-8 h-8 flex items-center justify-center text-3xl text-white"
                aria-label="Close menu"
              >
                &times;
              </button>
            </div>
            <ul className="flex flex-col items-center pt-24 space-y-6 text-2xl">
              <li>{renderPageLink('/', 'Home')}</li>
              <li>{renderPageLink('/about', 'About')}</li>
              <li>{renderPageLink('/mobilita', 'Mobilità sostenibile')}</li>
              <li>{renderPageLink('/luoghi', 'Luoghi')}</li>
              <li>{renderPageLink('/itinerari', 'Itinerari')}</li>
              <li>{renderPageLink('/stakeholders', 'Stakeholders')}</li>
              {/* <li>{renderPageLink('/residenze', 'Residenze')}</li> */}
              {/* <li>{renderPageLink('/articoli', 'Articoli')}</li> */}
            </ul>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar
