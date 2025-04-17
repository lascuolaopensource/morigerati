import { Media } from '@/payload-types'
import { Itinerari, Luoghi, Persone, Residenze } from '@/payload-types'

export type Item = Itinerari | Luoghi | Persone | Residenze

/**
 * Category types supported by the card component
 */
export type CategoryType = 'luoghi' | 'persone' | 'itinerari' | 'residenze'

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
