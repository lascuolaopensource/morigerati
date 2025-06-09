import { MainCollections } from '@/modules/types'
import { T } from './t'
import { cn } from '@/utils/utils'
import { getColorTheme } from '@/utils/colors'

//

export function SectionTitle(props: {
  children: React.ReactNode
  className?: string
  color?: MainCollections
}) {
  const { children, className, color: collection } = props
  const { border, text } = getColorTheme(collection)

  const classes = cn('border-b border-b-2', text, border, className)

  return (
    <T tag="h2" className={classes}>
      {children}
    </T>
  )
}
