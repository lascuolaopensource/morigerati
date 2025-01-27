'use client'
import React, { useEffect, useRef, useState } from 'react'
import Card from '../card'
import { Media } from '@/payload-types'
import { Itinerari, Luoghi, Stakeholder, Residenze } from '@/payload-types'

interface CardGridProps {
  items?: (Itinerari | Luoghi | Stakeholder | Residenze)[] | null
  category: 'luoghi' | 'stakeholders' | 'itinerari' | 'residenze'

  singleRow?: boolean
}

const CardGrid: React.FC<CardGridProps> = ({
  items = [],
  category,

  singleRow = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<typeof items>(items || [])
  const CARD_WIDTH = 240
  const CARD_GAP = 0

  useEffect(() => {
    const updateVisibleItems = () => {
      if (containerRef.current && items) {
        const containerWidth = containerRef.current.offsetWidth
        const maxCards = Math.floor((containerWidth + CARD_GAP) / (CARD_WIDTH + CARD_GAP))

        if (singleRow) {
          setVisibleItems(items.slice(0, maxCards))
        } else {
          setVisibleItems(items)
        }
      }
    }

    updateVisibleItems()
    window.addEventListener('resize', updateVisibleItems)
    return () => window.removeEventListener('resize', updateVisibleItems)
  }, [items, singleRow])

  if (!items || items.length === 0) {
    return null
  }

  return (
    <div ref={containerRef} className="w-full px-3 sm:px-4">
      <div className={`flex justify-center gap-3 ${singleRow ? 'flex-nowrap' : 'flex-wrap'}`}>
        {visibleItems &&
          visibleItems.map((item) => (
            <div key={item.id} className="w-[235px] flex-shrink-0">
              <Card
                collection={item}
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
