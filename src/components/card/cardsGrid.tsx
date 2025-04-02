'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Media } from '@/payload-types'
import Card from './card'
import { LAYOUT, GRID_COLUMNS } from './constants'
import { CardGridProps, Item } from './types'
import { useParams } from 'next/navigation'

/**
 * Helper function to extract article properties for display
 */
const getArticleProps = (item: any, locale: string = 'it') => {
  // If this is an article, extract the needed properties
  if (item && item.titolo) {
    // Extract tags properly - they might be objects with a 'tag' property
    const extractedTags = item.tags
      ? item.tags.map((tag: any) => (typeof tag === 'string' ? tag : tag.tag || ''))
      : []

    // Handle localized slugs - they might be objects with locale keys
    let slug = item.slug
    if (typeof slug === 'object' && slug !== null) {
      // Use the current locale's slug from the object if available
      // This will be properly handled in the component
    }

    // Handle localized titles
    let title = item.titolo
    if (typeof title === 'object' && title !== null) {
      // Get the current locale's title or fallback to the first available
      title = title[locale] || Object.values(title)[0] || ''
    }

    // Articles have titolo instead of nome, and might have sottotitolo
    return {
      title: title,
      media: typeof item.copertina === 'string' ? undefined : item.copertina,
      subtitle: item.sottotitolo,
      tags: extractedTags,
      slug: slug,
    }
  }

  // For regular items, return standard properties
  // Handle localized titles for regular items as well
  let title = item.nome
  if (typeof title === 'object' && title !== null) {
    title = title[locale] || Object.values(title)[0] || ''
  }

  return {
    title: title,
    media: typeof item.copertina === 'string' ? undefined : item.copertina,
    slug: item.slug,
  }
}

/**
 * CardGrid Component
 *
 * Displays a grid of cards with responsive layout.
 * Can be configured to show a single row with horizontal scrolling or a multi-row grid.
 */
const CardGrid: React.FC<CardGridProps> = ({
  items = [],
  category,
  singleRow = false,
  className = '',
}) => {
  const params = useParams()
  const locale = (params?.locale as string) || 'it'

  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<Item[]>(items || [])
  const [isOverflowing, setIsOverflowing] = useState(false)

  /**
   * Calculate the number of visible items based on container width
   * For single row mode, this limits the number of cards shown
   */
  const calculateVisibleItems = useCallback(() => {
    if (!containerRef.current || !items?.length) return

    const containerWidth = containerRef.current.offsetWidth
    const { CARD_WIDTH, GAP, MOBILE_PADDING, DESKTOP_PADDING, MOBILE_BREAKPOINT } = LAYOUT

    // Calculate available width based on screen size
    const padding = window.innerWidth >= MOBILE_BREAKPOINT ? DESKTOP_PADDING : MOBILE_PADDING
    const availableWidth = containerWidth - padding
    const maxCards = Math.floor((availableWidth + GAP) / (CARD_WIDTH + GAP))

    // Apply different behavior based on singleRow setting
    if (singleRow) {
      setVisibleItems(items.slice(0, maxCards))
      setIsOverflowing(items.length > maxCards)
    } else {
      setVisibleItems(items)
      setIsOverflowing(false)
    }
  }, [items, singleRow])

  // Recalculate on mount and window resize
  useEffect(() => {
    calculateVisibleItems()
    window.addEventListener('resize', calculateVisibleItems)
    return () => window.removeEventListener('resize', calculateVisibleItems)
  }, [calculateVisibleItems])

  // Don't render anything if there are no items
  if (!items?.length) return null

  // Determine grid class name based on singleRow setting
  const gridClassName = singleRow
    ? cn(
        'grid-flow-col auto-cols-[230px] overflow-x-auto snap-x pb-4',
        !isOverflowing && 'justify-center',
      )
    : Object.values(GRID_COLUMNS).join(' ')

  return (
    <div ref={containerRef} className={cn('relative w-full px-3 sm:px-6', className)}>
      <div
        className={cn('grid gap-3 place-items-center place-content-center', gridClassName)}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {visibleItems.map((item) => {
          const { title, media, subtitle, tags, slug } = getArticleProps(item, locale)

          // Handle localized slugs - they might be objects with locale keys
          let finalSlug = slug
          if (typeof slug === 'object' && slug !== null) {
            finalSlug = slug[locale] || Object.values(slug)[0]
          }

          return (
            <div
              key={item.id}
              className={cn(
                'transform transition-transform duration-300 hover:scale-[0.97] h-full',
                singleRow && 'snap-start snap-always',
              )}
            >
              <Card
                title={title}
                media={media}
                slugUrl={`/${locale}/${category}/${finalSlug}`}
                category={category}
                subtitle={subtitle}
                tags={tags}
              />
            </div>
          )
        })}
      </div>

      {/* Gradient fade effect for overflow indication */}
      {singleRow && isOverflowing && (
        <div className="absolute right-0 top-0 bottom-4 w-12 pointer-events-none bg-gradient-to-l from-white/80 to-transparent" />
      )}
    </div>
  )
}

export default CardGrid
