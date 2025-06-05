import { cn } from '@/lib/utils'
import { getColorTheme } from '@/utils/colors'
import { MainCollections } from '@/utils/types'

type Props = {
  children: React.ReactNode
  className?: string
  color?: MainCollections
  href?: string
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
  target?: '_blank' | '_self' | '_parent' | '_top'
}

export function Button(props: Props) {
  const { children, className, color, href, onClick, size = 'md', target = '_self' } = props
  const { bg } = getColorTheme(color)

  const classes = cn(
    'w-full rounded-full px-4 py-2 text-white text-nowrap text-center',
    'hover:cursor-pointer hover:scale-105 transition-transform duration-300',
    'flex items-center justify-center gap-1',
    bg,
    {
      'text-sm': size === 'sm',
      'text-md': size === 'md',
      'text-lg': size === 'lg',
    },
    className,
  )

  if (href) {
    return (
      <a href={href} className={classes} target={target}>
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
