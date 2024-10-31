'use client'
import React, { useEffect, useState } from 'react'

interface LogoGeneratorProps {
  textColor: string
}

const LogoGenerator: React.FC<LogoGeneratorProps> = ({ textColor = 'black' }) => {
  const [letters, setLetters] = useState({ first: '', second: '' })
  const [isHovering, setIsHovering] = useState(false)

  const generateLetters = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let letter1, letter2
    do {
      letter1 = alphabet[Math.floor(Math.random() * alphabet.length)]
      letter2 = alphabet[Math.floor(Math.random() * alphabet.length)]
    } while (
      !(letter1.toLowerCase() === letter1 && letter2.toLowerCase() !== letter2) &&
      !(letter1.toLowerCase() !== letter1 && letter2.toLowerCase() === letter2)
    )
    setLetters({ first: letter1, second: letter2 })
  }

  useEffect(() => {
    generateLetters()
    const normalInterval = setInterval(generateLetters, 3000)
    let hoverInterval: NodeJS.Timeout | null = null

    if (isHovering && window.innerWidth >= 1024) {
      hoverInterval = setInterval(generateLetters, 50)
    }

    return () => {
      clearInterval(normalInterval)
      if (hoverInterval) clearInterval(hoverInterval)
    }
  }, [isHovering])

  return (
    <div className="flex flex-col items-center">
      <div
        className="flex h-7 justify-center items-center text-center w-full text-red-400"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <svg
          viewBox="0 0 100 50"
          className="h-10 w-full"
          preserveAspectRatio="xMidYMid meet"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          fill={textColor}
        >
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="text-[30px] font-bold"
            style={{
              fontFamily: 'Transluoghi',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              color: 'white',
            }}
          >
            {letters.first}
            {letters.second}
          </text>
        </svg>
      </div>
      <div className="flex flex-col text-left -space-y-1">
        <span className="text-[9px] font-semibold">Transluoghi</span>
        <span className="text-[9px]">Ecomuseo del Bussento</span>
        <span className="text-[9px] text-right">Contemporaneo</span>
      </div>
    </div>
  )
}

export default LogoGenerator
