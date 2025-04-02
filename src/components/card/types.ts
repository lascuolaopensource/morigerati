import { Media } from '@/payload-types'
import { Itinerari, Luoghi, Stakeholder, Residenze, Articoli } from '@/payload-types'

export type Item = Itinerari | Luoghi | Stakeholder | Residenze | Articoli

/**
 * Category types supported by the card component
 */
export type CategoryType = 'luoghi' | 'stakeholders' | 'itinerari' | 'residenze' | 'articoli'

/**
 * Style definitions for card variants
 * Each category has specific styling applied to borders and text
 */
export const styleVariants: Record<
  Exclude<CategoryType, 'articoli'>,
  { border: string; text: string }
> = {
  itinerari: {
    border: 'border-itinerariColor bg-itinerariColor',
    text: 'text-itinerariColor',
  },
  luoghi: {
    border: 'border-luoghiColor bg-luoghiColor',
    text: 'text-luoghiColor',
  },
  stakeholders: {
    border: 'border-stakeholdersColor bg-stakeholdersColor',
    text: 'text-stakeholdersColor',
  },
  residenze: {
    border: 'border-residenzeColor bg-residenzeColor',
    text: 'text-residenzeColor',
  },
} as const

/**
 * Card grid configuration
 */
export interface CardGridConfig {
  /** Number of breakpoint columns */
  breakpointColumnsObj: {
    default: number
    [breakpoint: number]: number
  }
  /** Class name for the grid container */
  className: string
  /** Class name for the column */
  columnClassName: string
}

export interface CardGridProps {
  items?: Item[] | null
  category: CategoryType
  singleRow?: boolean
  className?: string
}

export interface CardProps {
  title: string
  media?: Media | undefined
  slugUrl: string
  category: CategoryType
}
