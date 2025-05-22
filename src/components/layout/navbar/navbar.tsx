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
    <>
      {/* Main navigation bar */}
      <nav className={`w-full ${theme} relative z-50`} role="navigation">
        <div className="flex max-w-screen-xl mx-auto py-1 justify-between items-center pl-2 pr-4">
          <LogoGenerator />
          <div className="flex items-center gap-4">
            <LocaleSwitcher />
            <XButton isOpen={isMenuOpen} onClick={toggleMenu} />
          </div>
        </div>
      </nav>

      <NavigationMenu isOpen={isMenuOpen} theme={theme} onItemClick={closeMenu} />
    </>
  )
}

export default Navbar
