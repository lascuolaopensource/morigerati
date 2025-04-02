'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { ArrowRightLeft } from 'lucide-react'
import { useTranslation } from '@/components/TranslationProvider'

const ToggleButton: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const paramFilter = searchParams.get('filter') as 'passata' | 'futura'
  const { t, locale } = useTranslation()

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

    return 'futura'
  }

  const [activeFilter, setActiveFilter] = useState<'passata' | 'futura'>(getFilterValue())

  // Sincronizza lo stato quando cambiano i parametri URL o la lingua
  useEffect(() => {
    if (paramFilter && paramFilter !== activeFilter) {
      setActiveFilter(paramFilter)
      localStorage.setItem('residenceFilter', paramFilter)
    } else if (!paramFilter) {
      // Se URL non ha parametro, aggiungilo
      router.push(`${pathname}?filter=${activeFilter}`, { scroll: false })
    }
  }, [pathname, paramFilter, locale, router])

  const handleFilterChange = () => {
    const newFilter = activeFilter === 'futura' ? 'passata' : 'futura'
    setActiveFilter(newFilter)
    localStorage.setItem('residenceFilter', newFilter)
    router.push(`${pathname}?filter=${newFilter}`, { scroll: false })
  }

  return (
    <div className="flex justify-center items-center pb-20 pt-12 md:max-w-[700px] mx-auto">
      <button
        onClick={handleFilterChange}
        className={`group relative w-full max-w-xs h-12 rounded-full overflow-hidden hover:scale-105 transition-all duration-300 ${
          activeFilter === 'futura' ? 'bg-residenzeColor' : 'bg-[#f5c8ba]'
        }`}
        aria-label={
          activeFilter === 'futura' ? t('residences:goToArchive') : t('residences:discoverAgenda')
        }
      >
        <div className="relative flex items-center justify-center w-full h-full">
          <span className="flex items-center gap-2 font-bold group-hover:-translate-y-px transition-transform duration-300">
            {activeFilter === 'futura'
              ? t('residences:goToArchive')
              : t('residences:discoverAgenda')}
          </span>

          <ArrowRightLeft
            className={`absolute right-4 w-5 h-5 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 ${
              activeFilter === 'futura' ? 'rotate-0' : 'rotate-180'
            }`}
          />
        </div>
      </button>
    </div>
  )
}

export default ToggleButton
