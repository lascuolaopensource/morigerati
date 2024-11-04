'use client'
import React from 'react'
import P0 from '@/public/pixels/p0.svg'
import P1 from '@/public/pixels/p1.svg'
import P2 from '@/public/pixels/p2.svg'
import P3 from '@/public/pixels/p3.svg'
import P4 from '@/public/pixels/p3.svg'

interface RandomPixelProps {
  p?: number
}

const pixelComponents: { [key: string]: JSX.Element } = {
  P0: <P0 />,
  P1: <P1 />,
  P2: <P2 />,
  P3: <P3 />,
  P4: <P4 />,
}

const RandomPixel: React.FC<RandomPixelProps> = ({ p }) => {
  let randomPixelKey: string
  if (p == undefined) {
    randomPixelKey = 'P' + Math.floor(Math.random() * 5)
  } else {
    randomPixelKey = 'P' + p
  }
  const RandomPixelComponent = pixelComponents[randomPixelKey as keyof typeof pixelComponents]
  return (
    <div className="relative w-full h-full" style={{ pointerEvents: 'none', zIndex: 0 }}>
      <div className="absolute right-0 w-1/2 h-full">{RandomPixelComponent}</div>
    </div>
  )
}

export { RandomPixel }
