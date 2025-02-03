'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Card, { CategoryType } from './card'
import { Media } from '@/payload-types'
import { Itinerari, Luoghi, Stakeholder, Residenze } from '@/payload-types'

type Item = Itinerari | Luoghi | Stakeholder | Residenze

interface CardGridProps {
  items?: Item[] | null
  category: CategoryType
  singleRow?: boolean
  className?: string
}

const CardGrid = ({ items = [], category, singleRow = false, className = '' }: CardGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<Item[]>(items || [])
  const [isOverflowing, setIsOverflowing] = useState(false)

  const updateVisibleItems = useCallback(() => {
    if (!containerRef.current || !items?.length) return

    const containerWidth = containerRef.current.offsetWidth
    const cardWidth = 230 // Card width from card.tsx
    const gap = 12 // gap-3 = 12px
    const padding = window.innerWidth >= 640 ? 48 : 24 // px-3 (24px) on mobile, px-6 (48px) on desktop

    const availableWidth = containerWidth - padding
    const maxCards = Math.floor((availableWidth + gap) / (cardWidth + gap))

    if (singleRow) {
      setVisibleItems(items.slice(0, maxCards))
      setIsOverflowing(items.length > maxCards)
    } else {
      setVisibleItems(items)
      setIsOverflowing(false)
    }
  }, [items, singleRow])

  useEffect(() => {
    updateVisibleItems()
    window.addEventListener('resize', updateVisibleItems)
    return () => window.removeEventListener('resize', updateVisibleItems)
  }, [updateVisibleItems])

  if (!items?.length) return null

  return (
    <div ref={containerRef} className={`relative w-full px-3 sm:px-6 ${className}`}>
      <div
        className={`
          grid gap-3
          ${
            singleRow
              ? 'grid-flow-col auto-cols-[230px] overflow-x-auto snap-x snap-mandatory pb-4'
              : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
          }
          ${singleRow && !isOverflowing ? 'justify-center' : ''}
        `}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {visibleItems.map((item) => (
          <div
            key={item.id}
            className={`
              ${singleRow ? 'snap-start snap-always' : ''}
              transform transition-transform duration-300 hover:scale-[0.97] h-full
            `}
          >
            <Card
              title={item.nome}
              media={item.copertina as Media | undefined}
              slugUrl={`/${category}/${item.slug}`}
              category={category}
            />
          </div>
        ))}
      </div>

      {singleRow && isOverflowing && (
        <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      )}
    </div>
  )
}

export default CardGrid
