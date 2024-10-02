'use client'
import dynamic from 'next/dynamic'

const DynamicMappa = dynamic(() => import('./map').then((mod) => mod.Mappa), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
})

export default DynamicMappa
