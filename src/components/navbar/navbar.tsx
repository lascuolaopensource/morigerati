'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS, THEME_COLORS, type PageType } from '@/constants/navigation'
import { XButton } from './xButton'
import { NavigationItem } from './NavigationItem'
import LogoGenerator from '@/components/logoGenerator/logo'

const useThemeColors = () => {
  const pathname = usePathname()
  const path = pathname.split('/')[1] as PageType
  const theme = THEME_COLORS[path] || THEME_COLORS.default
  return theme
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const theme = useThemeColors()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }

    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isMenuOpen])

  return (
    <div style={{ zIndex: 99999 }} className="pt-0.5">
      <nav className={`w-full ${theme.background} relative z-50`} role="navigation">
        <div
          className="absolute inset-0 top-[-100vh] -z-10"
          style={{ backgroundColor: 'inherit' }}
          aria-hidden="true"
        />

        <div className="flex max-w-screen-xl mx-auto py-1 justify-between items-center px-2">
          <LogoGenerator />
          <XButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen((prev) => !prev)} />
        </div>

        <div className={`absolute bottom-0 left-0 w-full h-0.5 `} aria-hidden="true" />
      </nav>

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
              {NAV_ITEMS.map(({ href, text }) => (
                <NavigationItem
                  key={href}
                  href={href}
                  text={text}
                  isActive={pathname.startsWith(href) && (href === '/' ? pathname === '/' : true)}
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
