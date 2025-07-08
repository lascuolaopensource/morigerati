import { MainCollections } from '#/types'

//

type ColorTheme = {
  text: string
  bg: string
  border: string
}

const textColors: Record<MainCollections | 'default', string> = {
  itinerari: 'text-itinerariColor',
  luoghi: 'text-luoghiColor',
  persone: 'text-personeColor',
  residenze: 'text-residenzeColor',
  default: 'text-black',
}

export const bgColors: Record<MainCollections | 'default', string> = {
  itinerari: 'bg-itinerariColor',
  luoghi: 'bg-luoghiColor',
  persone: 'bg-personeColor',
  residenze: 'bg-residenzeColor',
  default: 'bg-black',
}

const borderColors: Record<MainCollections | 'default', string> = {
  itinerari: 'border-itinerariColor',
  luoghi: 'border-luoghiColor',
  persone: 'border-personeColor',
  residenze: 'border-residenzeColor',
  default: 'border-black',
}

function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

export function getColorTheme(collection: MainCollections | undefined | 'default'): ColorTheme {
  const c = collection || 'default'
  return {
    text: textColors[c],
    bg: bgColors[c],
    border: borderColors[c],
  }
}

export function getRandomColorTheme(): ColorTheme {
  const keys = Object.keys(bgColors) as MainCollections[]
  const randomKey = randomChoice(keys)

  return getColorTheme(randomKey)
}
