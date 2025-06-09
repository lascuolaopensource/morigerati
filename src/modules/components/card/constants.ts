/**
 * Layout configuration for card components
 */
export const LAYOUT = {
  /** Width of a single card in pixels */
  CARD_WIDTH: 230,
  /** Gap between cards in pixels */
  GAP: 12,
  /** Padding for mobile views in pixels */
  MOBILE_PADDING: 24,
  /** Padding for desktop views in pixels */
  DESKTOP_PADDING: 48,
  /** Breakpoint for mobile/desktop transition in pixels */
  MOBILE_BREAKPOINT: 640,
} as const

/**
 * Responsive grid column configuration for different screen sizes
 */
export const GRID_COLUMNS = {
  /** Default (mobile) grid column configuration */
  DEFAULT: 'grid-cols-1',
  /** Small screens grid column configuration */
  SM: 'sm:grid-cols-2',
  /** Medium screens grid column configuration */
  MD: 'md:grid-cols-3',
  /** Large screens grid column configuration */
  LG: 'lg:grid-cols-4',
  /** Extra large screens grid column configuration */
  XL: 'xl:grid-cols-5',
} as const
