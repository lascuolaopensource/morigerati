//Boilerplate
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
//Components
import { NavigationItem } from './NavigationItem'
import { NAV_ITEMS } from './navConstants'

interface NavigationMenuProps {
  isOpen: boolean
  theme: string
  onItemClick: () => void
}

export const NavigationMenu = ({ isOpen, theme, onItemClick }: NavigationMenuProps) => {
  const pathname = usePathname()
  const tCommon = useTranslations()

  if (!isOpen) return null

  return (
    <div
      id="nav-menu"
      className={`fixed w-screen h-screen inset-0 ${theme} text-black z-40 overflow-hidden`}
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
              text={tCommon(key)}
              isActive={
                pathname
                  ? pathname.startsWith(href) && (href === '/' ? pathname === '/' : true)
                  : false
              }
              onClick={onItemClick}
            />
          ))}
        </ul>
      </nav>
    </div>
  )
}
