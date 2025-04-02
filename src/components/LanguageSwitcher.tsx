'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Locale, getLocalizedPath } from '@/utils/localization'

interface LanguageSwitcherProps {
  currentLocale: Locale
  className?: string
}

export default function LanguageSwitcher({ currentLocale, className = '' }: LanguageSwitcherProps) {
  const [isChangingLanguage, setIsChangingLanguage] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Chiude il dropdown quando si clicca fuori
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const changeLanguage = (newLocale: Locale) => {
    if (isChangingLanguage || newLocale === currentLocale) return

    setIsChangingLanguage(true)
    setIsOpen(false)

    const newPath = getLocalizedPath(pathname, newLocale)

    // Set the new locale in the cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`

    // Navigate to the new path
    router.push(newPath)

    // Reset the flag after navigation
    setTimeout(() => {
      setIsChangingLanguage(false)
    }, 500)
  }

  // Flags for each language
  const flags = {
    it: '🇮🇹',
    en: '🇬🇧',
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Switch language"
        className={`flex items-center justify-center text-sm rounded-md px-3 py-1.5 transition-all duration-200 hover:bg-black/5 ${className} ${isOpen ? 'bg-black/5' : ''}`}
        disabled={isChangingLanguage}
      >
        <span className="mr-2">{flags[currentLocale]}</span>
        <span>{currentLocale.toUpperCase()}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 ml-1 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 py-1 w-36 bg-white rounded-lg shadow-lg z-50 border border-gray-100 overflow-hidden transform origin-top transition-all duration-150 opacity-100 scale-100">
          <button
            className={`flex items-center w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-gray-50 ${currentLocale === 'it' ? 'bg-gray-50 text-gray-800' : 'text-gray-700'}`}
            onClick={() => changeLanguage('it')}
            disabled={currentLocale === 'it'}
          >
            <span className="mr-2 text-base">{flags.it}</span> Italiano
          </button>
          <button
            className={`flex items-center w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-gray-50 ${currentLocale === 'en' ? 'bg-gray-50 text-gray-800' : 'text-gray-700'}`}
            onClick={() => changeLanguage('en')}
            disabled={currentLocale === 'en'}
          >
            <span className="mr-2 text-base">{flags.en}</span> English
          </button>
        </div>
      )}
    </div>
  )
}
