type ColorType = 'luoghi' | 'itinerari' | 'residenze' | 'persone' | 'default'

type ColorData = {
  text: string
  bg: string
  border: string
}

export const textColors: Record<ColorType, string> = {
  luoghi: 'text-luoghiColor',
  itinerari: 'text-itinerariColor',
  residenze: 'text-residenzeColor',
  persone: 'text-personeColor',
  default: 'text-black',
}

export const bgColors: Record<ColorType, string> = {
  luoghi: 'bg-luoghiColor',
  itinerari: 'bg-itinerariColor',
  residenze: 'bg-residenzeColor',
  default: 'bg-white',
  persone: 'bg-personeColor',
}

export const borderColors: Record<ColorType, string> = {
  luoghi: 'border-luoghiColor',
  itinerari: 'border-itinerariColor',
  residenze: 'border-residenzeColor',
  persone: 'border-personeColor',
  default: 'border-black',
}

export function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

export function getRandomColor(): ColorData {
  const keys = Object.keys(bgColors).filter((key) => key !== 'default') as ColorType[]
  const randomKey = randomChoice(keys)

  return {
    text: textColors[randomKey],
    bg: bgColors[randomKey],
    border: borderColors[randomKey],
  }
}
