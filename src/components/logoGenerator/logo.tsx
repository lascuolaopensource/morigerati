'use client'
import React, { useEffect, useState } from 'react'

const LogoGenerator = () => {
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

    if (isHovering) {
      hoverInterval = setInterval(generateLetters, 50)
    }

    return () => {
      clearInterval(normalInterval)
      if (hoverInterval) clearInterval(hoverInterval)
    }
  }, [isHovering])

  return (
    <div className="">
      <div
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <svg
          viewBox="0 0 100 50"
          className="h-10 w-32"
          preserveAspectRatio="xMidYMid meet"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
        >
          <text
            x="50"
            y="25"
            dominantBaseline="central"
            textAnchor="middle"
            className="text-4xl font-bold"
            style={{
              fontFamily: 'Transluoghi',

              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
            }}
          >
            {letters.first}
            {letters.second}
          </text>
        </svg>
      </div>
    </div>
  )
}

export default LogoGenerator
