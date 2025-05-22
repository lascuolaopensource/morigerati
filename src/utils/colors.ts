import { MainCollections } from './types'

//

type ColorTheme = {
  text: string
  bg: string
  border: string
}

export const textColors: Record<MainCollections, string> = {
  itinerari: 'text-itinerariColor',
  luoghi: 'text-luoghiColor',
  persone: 'text-personeColor',
  residenze: 'text-residenzeColor',
}

export const bgColors: Record<MainCollections, string> = {
  itinerari: 'bg-itinerariColor',
  luoghi: 'bg-luoghiColor',
  persone: 'bg-personeColor',
  residenze: 'bg-residenzeColor',
}

export const borderColors: Record<MainCollections, string> = {
  itinerari: 'border-itinerariColor',
  luoghi: 'border-luoghiColor',
  persone: 'border-personeColor',
  residenze: 'border-residenzeColor',
}

export function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

export function getColorTheme(collection: MainCollections): ColorTheme {
  return {
    text: textColors[collection],
    bg: bgColors[collection],
    border: borderColors[collection],
  }
}

export function getRandomColorTheme(): ColorTheme {
  const keys = Object.keys(bgColors) as MainCollections[]
  const randomKey = randomChoice(keys)

  return getColorTheme(randomKey)
}
