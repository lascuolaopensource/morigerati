'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const PassateFuture: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const filter = (searchParams.get('filter') as 'passata' | 'futura') || 'passata'

  const handleFilterChange = (newFilter: 'passata' | 'futura') => {
    router.push(`/residenze?filter=${newFilter}`, { scroll: false })
  }

  return (
    <div className="flex justify-center pb-2">
      <div
        className={`flex flex-col justify-center h-7 w-20 rounded-md border-2 border-black transition-transform duration-300 ease-in-out hover:scale-110 ${
          filter === 'passata' ? 'bg-residenzeColor' : 'bg-[#f5c8ba]'
        }`}
        onClick={() => handleFilterChange('passata')}
      >
        <p className="text-center p-2 font-bold">passate</p>
      </div>
      <div className="w-2"></div>
      <div
        className={`flex flex-col justify-center h-7 w-20 rounded-md border-2 border-black transition-transform duration-300 ease-in-out hover:scale-110 ${
          filter === 'futura' ? 'bg-residenzeColor' : 'bg-[#f5c8ba]'
        }`}
        onClick={() => handleFilterChange('futura')}
      >
        <p className="text-center p-2 font-bold">future</p>
      </div>
    </div>
  )
}

export default PassateFuture
