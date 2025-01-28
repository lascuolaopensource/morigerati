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

const CARD_WIDTH = 240
const CARD_GAP = 0

const CardGrid = ({ items = [], category, singleRow = false }: CardGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<Item[]>(items || [])

  const updateVisibleItems = useCallback(() => {
    if (!containerRef.current || !items?.length) return

    const containerWidth = containerRef.current.offsetWidth
    const maxCards = Math.floor((containerWidth + CARD_GAP) / (CARD_WIDTH + CARD_GAP))

    setVisibleItems(singleRow ? items.slice(0, maxCards) : items)
  }, [items, singleRow])

  useEffect(() => {
    updateVisibleItems()
    window.addEventListener('resize', updateVisibleItems)
    return () => window.removeEventListener('resize', updateVisibleItems)
  }, [updateVisibleItems])

  if (!items?.length) return null

  return (
    <div ref={containerRef} className="w-full px-3 sm:px-4">
      <div
        className={`flex justify-center gap-3 ${
          singleRow ? 'flex-nowrap overflow-x-auto' : 'flex-wrap'
        }`}
      >
        {visibleItems.map((item) => (
          <div key={item.id} className="w-[235px] flex-shrink-0">
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
