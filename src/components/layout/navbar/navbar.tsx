'use client'

//Components
import LogoGenerator from '@/components/uiElements/logo'
import { XButton } from './xButton'
import { NavigationMenu } from './NavigationMenu'
//Locale
import { LocaleSwitcher } from '@/i18n/LocaleSwitcher'
//Hooks
import { useThemeColors, useMenuController } from './navHooks'

const Navbar = () => {
  const { isMenuOpen, toggleMenu, closeMenu } = useMenuController()
  const theme = useThemeColors()

  return (
    <div style={{ zIndex: 99999 }} className="pt-0.5">
      {/* Main navigation bar */}
      <nav className={`w-full ${theme} relative z-50`} role="navigation">
        <div
          className="absolute inset-0 top-[-100vh] -z-10"
          style={{ backgroundColor: 'inherit' }}
          aria-hidden="true"
        />

        <div className="flex max-w-screen-xl mx-auto py-1 justify-between items-center px-2">
          <LogoGenerator />
          <div className="flex items-center gap-4">
            <LocaleSwitcher />
            <XButton isOpen={isMenuOpen} onClick={toggleMenu} />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-0.5" aria-hidden="true" />
      </nav>

      {/* Mobile navigation menu */}
      <NavigationMenu isOpen={isMenuOpen} theme={theme} onItemClick={closeMenu} />
    </div>
  )
}

export default Navbar
