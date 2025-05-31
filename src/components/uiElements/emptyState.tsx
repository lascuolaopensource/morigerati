import { MainCollections } from '@/utils/types'
import { RandomLetterNew } from './randomLetterNew'
import { T } from './t'

type Props = {
  title?: string
  description?: string
  children?: React.ReactNode
  color?: MainCollections
  height?: number
}

export function EmptyState(props: Props) {
  const { title, description, children, color, height = 200 } = props

  return (
    <div
      style={{ height: `${height}px` }}
      className="relative flex flex-col items-center justify-center"
    >
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <RandomLetterNew color={color} size={height} />
        {/* <RandomLetterNew color={color} size={height} /> */}
      </div>
      {title && <T tag="h3">{title}</T>}
      {description && <T>{description}</T>}
      {children}
    </div>
  )
}
