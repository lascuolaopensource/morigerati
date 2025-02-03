'use client'
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRightLeft } from 'lucide-react'

const ToggleButton: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const filter = (searchParams.get('filter') as 'passata' | 'futura') || 'futura'

  const handleFilterChange = () => {
    const newFilter = filter === 'futura' ? 'passata' : 'futura'
    router.push(`/residenze?filter=${newFilter}`, { scroll: false })
  }

  return (
    <div className="flex justify-center items-center pb-20 pt-12 md:max-w-[700px] mx-auto ">
      <button
        onClick={handleFilterChange}
        className="group relative w-full max-w-xs h-12 rounded-full overflow-hidden transition-all duration-300 ease-in-out hover:scale-105  "
        aria-label={filter === 'futura' ? "Vai all'archivio" : "Scopri l'agenda"}
      >
        <div
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            filter === 'futura' ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="absolute inset-0 bg-residenzeColor" />
          <div className="absolute inset-0 bg-[#f5c8ba] translate-x-full" />
        </div>

        <div className="relative flex items-center justify-center w-full h-full overflow-hidden">
          <span
            className={`flex items-center gap-2 font-bold transition-all duration-500 ease-in-out transform group-hover:-translate-y-px ${
              filter === 'futura' ? 'animate-slideInDown' : 'animate-slideInUp'
            }`}
          >
            {filter === 'futura' ? "Vai all'archivio" : "Scopri l'agenda"}
          </span>

          <ArrowRightLeft
            className={`absolute right-4 w-5 h-5 transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 ${
              filter === 'futura' ? 'rotate-0' : 'rotate-180'
            }`}
          />
        </div>
      </button>

      <style jsx global>{`
        @keyframes slideInDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes slideInUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

export default ToggleButton
