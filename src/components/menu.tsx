import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/logo.png'

interface HamburgerMenuProps {
  isOpen: boolean
  onClose: () => void
  currentPath: string
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClose, currentPath }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const renderPageLink = (href: string, text: string): JSX.Element => {
    const isActive = currentPath.startsWith(href) && (href === '/' ? currentPath === '/' : true)
    return (
      <Link href={href} className="flex items-center" onClick={onClose}>
        {isActive && <span className="mr-2">&rarr;</span>}
        {text}
      </Link>
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed w-screen h-screen inset-0 bg-black text-white z-40 overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="py-4 px-6 border-b border-b-white flex-shrink-0">
          <div className="mx-auto max-w-7xl flex justify-between items-center">
            <div className="w-8"></div>
            <div className="flex justify-center">
              <Image src={logo} alt="Logo" width={100} />
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 pr-10 prflex items-left justify-left text-3xl text-white"
              aria-label="Close menu"
            >
              &times;
            </button>
          </div>
        </div>
        <ul className="flex flex-col items-center pt-12 space-y-6 text-2xl overflow-y-auto flex-grow">
          <li>{renderPageLink('/', 'Home')}</li>
          <li>{renderPageLink('/about', 'About')}</li>
          <li>{renderPageLink('/mobilita', 'Mobilità sostenibile')}</li>
          <li>{renderPageLink('/luoghi', 'Luoghi')}</li>
          <li>{renderPageLink('/itinerari', 'Itinerari')}</li>
          <li>{renderPageLink('/stakeholders', 'Stakeholders')}</li>
          <li>{renderPageLink('/residenze', 'Residenze')}</li>
          <li>{renderPageLink('/articoli', 'Articoli')}</li>
          <div className="py-4"></div>
        </ul>
      </div>
    </div>
  )
}

export default HamburgerMenu
