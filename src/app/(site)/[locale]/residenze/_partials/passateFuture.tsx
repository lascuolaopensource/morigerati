'use client'
//Boilerplate
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
//Components
import { ChevronDown } from 'lucide-react'
//Locale
import { useMessages } from 'next-intl'

const FilterDropdown: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const paramFilter = searchParams ? (searchParams.get('filter') as 'passata' | 'futura') : null
  const messages = useMessages()

  // Always default to showing "futura" (program) if no filter is specified
  const getFilterValue = (): 'passata' | 'futura' => {
    if (paramFilter === 'passata' || paramFilter === 'futura') {
      return paramFilter
    }

    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('residenceFilter')
      if (stored === 'passata' || stored === 'futura') {
        return stored
      }
    }

    return 'futura' // Default to program/future residences
  }

  const [activeFilter, setActiveFilter] = useState<'passata' | 'futura'>(getFilterValue())

  // Sync state when URL parameters or language change
  useEffect(() => {
    if (paramFilter && paramFilter !== activeFilter) {
      setActiveFilter(paramFilter)
      localStorage.setItem('residenceFilter', paramFilter)
    } else if (!paramFilter) {
      // If URL has no parameter, always default to "futura" (program)
      const defaultFilter = 'futura'
      setActiveFilter(defaultFilter)
      localStorage.setItem('residenceFilter', defaultFilter)
      router.push(`${pathname}?filter=${defaultFilter}`, { scroll: false })
    }
  }, [pathname, paramFilter, router, activeFilter])

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = e.target.value as 'passata' | 'futura'
    setActiveFilter(newFilter)
    localStorage.setItem('residenceFilter', newFilter)
    router.push(`${pathname}?filter=${newFilter}`, { scroll: false })
  }

  return (
    <div className="flex justify-center items-center mb-8 md:max-w-[260px] mx-auto">
      <div className="relative w-full">
        <select
          value={activeFilter}
          onChange={handleFilterChange}
          className={`appearance-none block w-full px-4 py-3 rounded-lg font-medium text-center border focus:outline-none focus:ring-2 transition-all duration-300 cursor-pointer ${
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
    </div>
  )
}

export default FilterDropdown
