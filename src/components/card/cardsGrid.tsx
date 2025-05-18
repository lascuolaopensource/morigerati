'use client'
//Boilerplate
import React, { useEffect, useRef, useState } from 'react'
//Utils
import { cn } from '@/lib/utils'
//Components
import Card from './card'
//Constants
import { CategoryType, Item } from './types'
//DB
import type { Media } from '@/payload-types'

interface CardGridProps {
  items: Item[]
  category: CategoryType
  singleRow?: boolean
  className?: string
}

const CardGrid: React.FC<CardGridProps> = ({
  items,
  category,
  singleRow = false,
  className = '',
}) => {
  // Always call hooks at the top level, unconditionally
  const containerRef = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState(1)
  const [visibleCards, setVisibleCards] = useState(items.length)

  // Card dimensions
  const CARD_WIDTH = 230
  const GAP = 12

  // Effect to calculate the number of columns based on container width
  useEffect(() => {
    if (!containerRef.current) return

    const calculateLayout = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.clientWidth

      if (singleRow) {
        // Calculate how many cards can fit in the container for single row
        const possibleCards = Math.floor((containerWidth + GAP) / (CARD_WIDTH + GAP))
        const actualVisibleCards = Math.max(1, possibleCards)
        setVisibleCards(actualVisibleCards)
      } else {
        // Calculate columns for grid layout
        const possibleColumns = Math.floor((containerWidth + GAP) / (CARD_WIDTH + GAP))
        const actualColumns = Math.max(1, possibleColumns)
        setColumns(actualColumns)
      }
    }

    // Initial calculation
    calculateLayout()

    // Recalculate on resize
    const resizeObserver = new ResizeObserver(calculateLayout)
    resizeObserver.observe(containerRef.current)

    // Fix for exhaustive-deps warning
    const currentRef = containerRef.current

    return () => {
      if (currentRef) {
        resizeObserver.unobserve(currentRef)
      }
      resizeObserver.disconnect()
    }
  }, [singleRow, GAP, CARD_WIDTH])

  if (!items?.length) return null

  // Style for individual cards
  const cardStyle = {
    width: `${CARD_WIDTH}px`,
    minWidth: `${CARD_WIDTH}px`,
    maxWidth: `${CARD_WIDTH}px`,
  }

  // Grid container style for multi-row layout
  const gridStyle = !singleRow
    ? {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: `${GAP}px`,
        width: '100%',
      }
    : undefined

  // Limit items in single row mode
  const displayItems = singleRow ? items.slice(0, visibleCards) : items

  if (singleRow) {
    // Calculate total width of displayed cards
    const totalCardsWidth = visibleCards * CARD_WIDTH + (visibleCards - 1) * GAP

    // Single row with centered cards
    return (
      <div ref={containerRef} className={cn('relative w-full card-grid-container', className)}>
        <div className="flex justify-center">
          <div className="flex gap-3 pb-4" style={{ width: `${totalCardsWidth}px` }}>
            {displayItems.map((item) => (
              <div key={item.id} style={cardStyle} className="flex-shrink-0 flex-grow-0">
                <Card
                  title={item.nome}
                  media={item.copertina as Media}
                  slugUrl={`/${category}/${typeof item.slug === 'string' ? item.slug : ''}`}
                  category={category}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Multi-row grid with container-responsive columns
  return (
    <div ref={containerRef} className={cn('relative w-full card-grid-container', className)}>
      <div style={gridStyle}>
        {displayItems.map((item) => (
          <div key={item.id} className="flex justify-center">
            <div style={cardStyle}>
              <Card
                title={item.nome}
                media={item.copertina as Media}
                slugUrl={`/${category}/${typeof item.slug === 'string' ? item.slug : ''}`}
                category={category}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardGrid
