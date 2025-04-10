import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getLocaleFromPath, Locale } from '@/utils/localization'
import { defaultLocale } from '@/middleware'

interface NavigationItemProps {
  href: string
  translationKey: string
  isActive: boolean
  onClick: () => void
  text: string
}

export const NavigationItem = ({
  href,
  translationKey,
  isActive,
  onClick,
  text,
}: NavigationItemProps) => {
  const pathname = usePathname()
  const currentLocale = pathname ? getLocaleFromPath(pathname) : defaultLocale

  // Add locale prefix to links if they're not already absolute URLs
  const localizedHref =
    href.startsWith('http') || href.startsWith('/api')
      ? href
      : `/${currentLocale}${href === '/' ? '' : href}`

  return (
    <li>
      <Link
        href={localizedHref}
        className={`flex items-center hover:opacity-70 transition-opacity duration-200 text-2xl ${
          isActive ? 'font-bold' : 'font-normal'
        }`}
        onClick={onClick}
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
