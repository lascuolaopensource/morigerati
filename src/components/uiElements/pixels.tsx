'use client'
import React, { useEffect, useState } from 'react'

interface RandomPixelProps {
  p?: number
  size?: number
}

const RandomPixel: React.FC<RandomPixelProps> = ({ p, size }) => {
  const [randomPixelIndex, setRandomPixelIndex] = useState(0)

  useEffect(() => {
    // If p is provided, use that, otherwise generate random index
    if (p !== undefined && p >= 0 && p < 5) {
      setRandomPixelIndex(p)
    } else {
      // Generate random number only on client side
      const randomIndex = Math.floor(Math.random() * 5)
      setRandomPixelIndex(randomIndex)
    }
  }, [p])

  return (
    <div className="relative" style={{ pointerEvents: 'none', zIndex: -1000 }}>
      <div
        className="absolute right-0 w-1/2 md:w-1/6"
        style={{ height: size ? `${size}px` : 'auto' }}
      >
        <img
          src={`/pixels/p${randomPixelIndex}.svg`}
          alt="Decorative pixel element"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  )
}

export { RandomPixel }
