import { cn } from '@/lib/utils'
import { getColorTheme } from '@/utils/colors'
import { MainCollections } from '@/modules/types'

interface Props {
  color?: MainCollections
  className?: string
  size?: number
}

function generateRandomLetter(): string {
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26))
  return Math.random() > 0.5 ? letter.toLowerCase() : letter
}

export function RandomLetterNew(props: Props) {
  const { color = 'itinerari', className, size = 96 } = props
  const letter = generateRandomLetter()
  const { text } = getColorTheme(color)

  const classes = cn(text, 'opacity-20 font-transluoghi block select-none text-center', className)

  return (
    <p style={{ fontSize: `${size}px`, lineHeight: `${size}px` }} className={classes}>
      {letter}
    </p>
  )
}
