export const NAV_ITEMS = [
  { href: '/', key: 'navigation.home' },
  { href: '/about', key: 'navigation.about' },
  { href: '/mobilita', key: 'navigation.mobility' },
  { href: '/luoghi', key: 'navigation.places' },
  { href: '/itinerari', key: 'navigation.itineraries' },
  { href: '/stakeholders', key: 'navigation.stakeholders' },
  { href: '/residenze', key: 'navigation.residences' },
  { href: '/articoli', key: 'navigation.articles' },
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
