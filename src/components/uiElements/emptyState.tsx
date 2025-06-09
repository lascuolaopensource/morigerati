import { MainCollections } from '@/modules/types'
import { RandomLetterNew } from './randomLetterNew'
import { T } from './t'
import { getColorTheme } from '@/utils/colors'

type Props = {
  title?: string
  description?: string
  children?: React.ReactNode
  color?: MainCollections
  height?: number
}

export function EmptyState(props: Props) {
  const { title, description, children, color, height = 200 } = props
  const { bg } = getColorTheme(color)

  return (
    <div
      style={{ height: `${height}px` }}
      className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg"
    >
      <div
        className={`absolute -z-50 select-none inset-0 w-full h-full flex items-center justify-center opacity-40 ${bg}/20`}
      >
        <RandomLetterNew color={color} size={height} className="opacity-30" />
        <RandomLetterNew color={color} size={height} className="opacity-30" />
        <RandomLetterNew color={color} size={height} className="opacity-30" />
      </div>
      <div className="flex flex-col items-center gap-2">
        {title && <T tag="h3">{title}</T>}
        {description && <T>{description}</T>}
        {children}
      </div>
    </div>
  )
}
