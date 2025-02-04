'use client'
import React, { JSX, useEffect, useState } from 'react'
import P0 from '@/public/pixels/p0.svg'
import P1 from '@/public/pixels/p1.svg'
import P2 from '@/public/pixels/p2.svg'
import P3 from '@/public/pixels/p3.svg'
import P4 from '@/public/pixels/p3.svg'

interface RandomPixelProps {
  p?: number
  size?: number
}

const pixelComponents: { [key: string]: JSX.Element } = {
  P0: <P0 />,
  P1: <P1 />,
  P2: <P2 />,
  P3: <P3 />,
  P4: <P4 />,
}

const RandomPixel: React.FC<RandomPixelProps> = ({ p, size }) => {
  const [randomPixelKey, setRandomPixelKey] = useState('P0')

  useEffect(() => {
    // Generate random number only on client side
    const randomIndex = Math.floor(Math.random() * 5)
    setRandomPixelKey(`P${randomIndex}`)
  }, [])

  const RandomPixelComponent = pixelComponents[randomPixelKey as keyof typeof pixelComponents]

  return (
    <div className="relative" style={{ pointerEvents: 'none', zIndex: -1000 }}>
      <div
        className="absolute right-0 w-1/2 md:w-1/6"
        style={{ height: size ? `${size}px` : 'auto' }}
      >
        {RandomPixelComponent}
      </div>
    </div>
  )
}

export { RandomPixel }
