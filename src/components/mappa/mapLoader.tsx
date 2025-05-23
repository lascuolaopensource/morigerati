'use client'
import dynamic from 'next/dynamic'

const DynamicMappa = dynamic(() => import('./map').then((mod) => mod.Mappa), {
  loading: () => (
    <div className="h-full w-full bg-black/10 animate-pulse flex items-center justify-center border-2 border-black/30 rounded-lg">
      <p className="text-black/50">Loading map...</p>
    </div>
  ),
  ssr: false,
})

export default DynamicMappa
