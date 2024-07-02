'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('../../components/Map'), { ssr: false })

const Home = () => {
  const [gpxData, setGpxData] = useState<string>('')

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (result) {
          console.log('GPX Data:', result)
          setGpxData(result)
        } else {
          console.error('Failed to read file.')
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div>
      <input type="file" accept=".gpx" onChange={handleFileUpload} />
      {gpxData && <Map key={gpxData} gpxData={gpxData} />}
    </div>
  )
}

export default Home
