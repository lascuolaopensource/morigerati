import { cn } from '@/lib/utils'
import { getColorTheme } from '@/utils/colors'
import { MainCollections } from '@/utils/types'

type Props = {
  children: React.ReactNode
  className?: string
  color?: MainCollections
  href?: string
  onClick?: () => void
}

export function Button(props: Props) {
  const { children, className, color, href, onClick } = props
  const { bg } = getColorTheme(color)

  const classes = cn(
    'rounded-full px-4 py-2 text-white text-nowrap',
    'hover:cursor-pointer hover:scale-105 transition-transform duration-300',
    'flex items-center gap-1',
    bg,
    className,
  )

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} onClick={onClick}>
        {children}
      </button>
    )
  }
}
