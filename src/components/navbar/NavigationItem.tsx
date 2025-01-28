import Link from 'next/link'

interface NavigationItemProps {
  href: string
  text: string
  isActive: boolean
  onClick: () => void
}

export const NavigationItem = ({ href, text, isActive, onClick }: NavigationItemProps) => (
  <li>
    <Link
      href={href}
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
