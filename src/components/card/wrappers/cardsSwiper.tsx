'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Card, { CategoryType } from '../card'
import { Media } from '@/payload-types'
import { Itinerari, Luoghi, Stakeholder, Residenze } from '@/payload-types'

type Item = Itinerari | Luoghi | Stakeholder | Residenze

interface CardGridProps {
  items?: Item[] | null
  category: CategoryType
  singleRow?: boolean
}

const CardGrid = ({ items = [], category, singleRow = false }: CardGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<Item[]>(items || [])

  const updateVisibleItems = useCallback(() => {
    if (!containerRef.current || !items?.length) return

    const containerWidth = containerRef.current.offsetWidth
    const cardWidth = 240 // Card width
    const gap = 12 // Gap between cards (gap-3 = 12px)
    const padding = window.innerWidth >= 640 ? 48 : 24 // px-3 (24px) on mobile, px-6 (48px) on desktop

    const availableWidth = containerWidth - padding
    const maxCards = Math.floor((availableWidth + gap) / (cardWidth + gap))

    setVisibleItems(singleRow ? items.slice(0, maxCards) : items)
  }, [items, singleRow])

  useEffect(() => {
    updateVisibleItems()
    window.addEventListener('resize', updateVisibleItems)
    return () => window.removeEventListener('resize', updateVisibleItems)
  }, [updateVisibleItems])

  if (!items?.length) return null

  return (
    <div ref={containerRef} className="w-full px-3 sm:px-6 overflow-hidden">
      <div
        className={`flex flex-wrap justify-center gap-3 ${
          singleRow ? 'sm:flex-nowrap sm:overflow-x-auto sm:justify-center' : ''
        }`}
      >
        {visibleItems.map((item) => (
          <div key={item.id} className="w-[240px] shrink-0 grow-0">
            <Card
              title={item.nome}
              media={item.copertina as Media | undefined}
              slugUrl={`/${category}/${item.slug}`}
              category={category}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardGrid
