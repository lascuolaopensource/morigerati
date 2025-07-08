//Locale
import { Link } from '#/i18n/routing'
import { useLocale } from 'next-intl'

interface NavigationItemProps {
  href: string
  translationKey: string
  isActive: boolean
  onClick: () => void
  text: string
}

export const NavigationItem = ({ href, isActive, onClick, text }: NavigationItemProps) => {
  const currentLocale = useLocale()

  // Don't manually add locale prefix, let the Link component handle it
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center hover:opacity-70 transition-opacity duration-200 text-2xl ${
          isActive ? 'font-bold' : 'font-normal'
        }`}
        onClick={onClick}
        locale={currentLocale}
      >
        {isActive && (
          <span className="mr-2" aria-hidden="true">
            &rarr;
          </span>
        )}
        {text}
      </Link>
    </li>
  )
}

// Helper function to generate localized href
function getLocalizedHref(href: string, locale: string): string {
  if (href.startsWith('http') || href.startsWith('/api')) {
    return href
  }

  return href === '/' ? `/${locale}` : `/${locale}${href}`
}
