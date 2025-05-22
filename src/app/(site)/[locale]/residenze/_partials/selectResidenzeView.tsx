'use client'
//Boilerplate
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
//Components
import { ChevronDown } from 'lucide-react'

// Create a union type for filter values
export type FilterType = 'passata' | 'futura'

interface FilterDropdownProps {
  onFilterChange?: (filter: FilterType) => void
}

const FILTER_PARAM = 'filter'

function getFilterFromString(filter?: string | null): FilterType {
  return filter === 'passata' ? 'passata' : 'futura'
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onFilterChange }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  function getPathWithFilter(filter: FilterType) {
    return `${pathname}?${FILTER_PARAM}=${filter}`
  }

  const paramFilter = searchParams.get(FILTER_PARAM)
  const [activeFilter, setActiveFilter] = useState<FilterType>(getFilterFromString(paramFilter))

  useEffect(() => {
    if (paramFilter && paramFilter !== activeFilter) {
      setActiveFilter(getFilterFromString(paramFilter))
    }
  }, [pathname, paramFilter, router, activeFilter])

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = e.target.value as FilterType
    setActiveFilter(newFilter)
    router.push(getPathWithFilter(newFilter), { scroll: false })

    if (onFilterChange) {
      onFilterChange(newFilter)
    }
  }

  return (
    <div className="relative w-[160px]">
      <select
        value={activeFilter}
        onChange={handleFilterChange}
        className={`appearance-none block w-full pr-4 pl-2 py-3 rounded-lg font-medium text-center border focus:outline-none focus:ring-2 transition-all duration-300 cursor-pointer ${
          activeFilter === 'futura'
            ? 'bg-residenzeColor border-residenzeColor/30 focus:ring-residenzeColor/50'
            : 'bg-[#f5c8ba] border-[#f5c8ba]/30 focus:ring-[#f5c8ba]/50'
        }`}
      >
        <option value="futura">Programma</option>
        <option value="passata">Archivio</option>
      </select>

      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
        <ChevronDown className="w-5 h-5" />
      </div>
    </div>
  )
}

export default FilterDropdown
