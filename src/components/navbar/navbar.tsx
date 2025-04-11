'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS, THEME_COLORS, type PageType } from '@/constants/navigation'
import { XButton } from './xButton'
import { NavigationItem } from './NavigationItem'
import LogoGenerator from '@/components/logoGenerator/logo'
import { LocaleSwitcher } from '@/i18n/LocaleSwitcher'
import { useLocale } from 'next-intl'

// Dizionario di traduzioni per i menu
const MENU_TRANSLATIONS: Record<string, Record<string, string>> = {
  it: {
    'navigation.home': 'Home',
    'navigation.about': 'Chi Siamo',
    'navigation.mobility': 'Mobilità Sostenibile',
    'navigation.places': 'Luoghi',
    'navigation.itineraries': 'Itinerari',
    'navigation.stakeholders': 'Persone',
    'navigation.residences': 'Residenze',
    'navigation.articles': 'Articoli',
  },
  en: {
    'navigation.home': 'Home',
    'navigation.about': 'About Us',
    'navigation.mobility': 'Sustainable Mobility',
    'navigation.places': 'Places',
    'navigation.itineraries': 'Itineraries',
    'navigation.stakeholders': 'People',
    'navigation.residences': 'Residences',
    'navigation.articles': 'Articles',
  },
}

/**
 * Hook to determine theme colors based on current pathname
 * @returns Theme color configuration for the current page
 */
const useThemeColors = () => {
  const pathname = usePathname()
  const path = pathname ? (pathname.split('/')[1] as PageType) : 'default'
  const theme = THEME_COLORS[path] || THEME_COLORS.default
  return theme
}

/**
 * Navbar Component
 *
 * Responsive navigation bar that adapts its color scheme based on the current route.
 * Includes a mobile menu that can be toggled open/closed.
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const theme = useThemeColors()
  const locale = useLocale()
  // const currentLocale = pathname ? (getLocaleFromPath(pathname) as Locale) : defaultLocale

  // Ottieni le traduzioni per la locale corrente
  // const translations = MENU_TRANSLATIONS[currentLocale] || MENU_TRANSLATIONS.it

  // Handle escape key press and body scroll lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }

    // Prevent scrolling when menu is open
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isMenuOpen])

  return (
    <div style={{ zIndex: 99999 }} className="pt-0.5">
      {/* Main navigation bar */}
      <nav className={`w-full ${theme.background} relative z-50`} role="navigation">
        <div
          className="absolute inset-0 top-[-100vh] -z-10"
          style={{ backgroundColor: 'inherit' }}
          aria-hidden="true"
        />

        <div className="flex max-w-screen-xl mx-auto py-1 justify-between items-center px-2">
          <LogoGenerator />
          <div className="flex items-center gap-4">
            <LocaleSwitcher />
            <XButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen((prev) => !prev)} />
          </div>
        </div>

        <div className={`absolute bottom-0 left-0 w-full h-0.5 `} aria-hidden="true" />
      </nav>

      {/* Mobile navigation menu - only shown when isMenuOpen is true */}
      {isMenuOpen && (
        <div
          id="nav-menu"
          className={`fixed w-screen h-screen inset-0 ${theme.background} text-black z-40 overflow-hidden`}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <nav className="flex-grow pt-28">
            <ul className="flex flex-col items-center space-y-6 overflow-y-auto">
              {NAV_ITEMS.map(({ href, key }) => (
                <NavigationItem
                  key={href}
                  href={href}
                  translationKey={key}
                  text={MENU_TRANSLATIONS[locale][key] || key}
                  isActive={
                    pathname
                      ? pathname.startsWith(href) && (href === '/' ? pathname === '/' : true)
                      : false
                  }
                  onClick={() => setIsMenuOpen(false)}
                />
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  )
}

export default Navbar
