export const NAV_ITEMS = [
  { href: '/', text: 'Home' },
  { href: '/about', text: 'About' },
  { href: '/mobilita', text: 'Mobilità sostenibile' },
  { href: '/luoghi', text: 'Luoghi' },
  { href: '/itinerari', text: 'Itinerari' },
  { href: '/stakeholders', text: 'Persone' },
  { href: '/residenze', text: 'Residenze' },
  { href: '/articoli', text: 'Articoli' },
] as const

export type PageType = 'luoghi' | 'itinerari' | 'stakeholders' | 'residenze' | 'default'

export const THEME_COLORS = {
  luoghi: {
    background: 'bg-luoghiColor',
    border: 'bg-luogoColorScuro',
  },
  itinerari: {
    background: 'bg-itinerariColor',
    border: 'bg-itinerarioColorScuro',
  },
  stakeholders: {
    background: 'bg-stakeholdersColor',
    border: 'bg-stakeholderColorScuro',
  },
  residenze: {
    background: 'bg-residenzeColor',
    border: 'bg-residenzeColorScuro',
  },
  default: {
    background: 'bg-white',
    border: 'bg-black',
  },
} as const
