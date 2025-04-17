'use client'

import React, { useState } from 'react'
import { Residenze } from '@/payload-types'
import CardGrid from '@/components/card/cardsGrid'

interface FilterDropdownProps {
  futureLabel: string
  pastLabel: string
  futureResidenze: Residenze[]
  pastResidenze: Residenze[]
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  futureLabel,
  pastLabel,
  futureResidenze,
  pastResidenze,
}) => {
  const [filter, setFilter] = useState<'future' | 'past'>('future')

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as 'future' | 'past')
  }

  const displayResidenze = filter === 'future' ? futureResidenze : pastResidenze

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {filter === 'future' ? futureLabel : pastLabel}
        </h2>
        <div className="relative">
          <select
            className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="future">{futureLabel}</option>
            <option value="past">{pastLabel}</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {displayResidenze.length > 0 ? (
        <CardGrid items={displayResidenze} category="residenze" />
      ) : (
        <div className="text-center py-8 text-gray-500">
          {filter === 'future'
            ? 'Non ci sono residenze future disponibili.'
            : 'Non ci sono residenze passate disponibili.'}
        </div>
      )}
    </div>
  )
}

export default FilterDropdown
