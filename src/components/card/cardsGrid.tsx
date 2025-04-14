'use client'
//Boilerplate
import React from 'react'
//Utils
import { cn } from '@/lib/utils'
//Components
import Card from './card'
//Constants
import { GRID_COLUMNS } from './constants'
import { CategoryType } from './types'
//DB
import { Itinerari, Luoghi, Residenze, Stakeholder } from '@/payload-types'

interface CardGridProps {
  items: Itinerari[] | Luoghi[] | Residenze[] | Stakeholder[]
  category: CategoryType
  singleRow?: boolean
  className?: string
}

const CardGrid: React.FC<CardGridProps> = ({
  items = [],
  category,
  singleRow = false,
  className = '',
}) => {
  const [visibleCards, setVisibleCards] = React.useState<number>(0)

  React.useEffect(() => {
    if (singleRow) {
      const calculateVisibleCards = () => {
        const container = document.querySelector('.card-grid-container')
        if (!container) return
        const containerWidth = container.clientWidth
        const cardWidth = 230 // Width of each card
        const gap = 12 // Gap between cards (3 * 4px)
        const visibleCount = Math.floor(containerWidth / (cardWidth + gap))
        setVisibleCards(visibleCount)
      }

      calculateVisibleCards()
      window.addEventListener('resize', calculateVisibleCards)
      return () => window.removeEventListener('resize', calculateVisibleCards)
    }
  }, [singleRow])

  if (!items?.length) return null

  const gridClassName = singleRow
    ? 'grid-flow-col auto-cols-[230px] gap-3'
    : Object.values(GRID_COLUMNS).join(' ')

  const displayItems = singleRow ? items.slice(0, visibleCards) : items

  return (
    <div className={cn('relative w-full px-3 sm:px-6 card-grid-container', className)}>
      <div
        className={cn(
          'grid gap-3 place-items-center place-content-center',
          gridClassName,
          singleRow && 'justify-center',
        )}
      >
        {displayItems.map((item) => (
          <div
            key={item.id}
            className={cn('transform transition-transform duration-300 hover:scale-[0.97] h-full')}
          >
            <Card
              title={item.nome}
              media={item.copertina as string}
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
