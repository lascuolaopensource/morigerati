'use client'
import React, { useEffect, useState } from 'react'
import { Link } from '@/modules/i18n/routing'

interface LogoGeneratorProps {
  textColor?: string
}

const LogoGenerator: React.FC<LogoGeneratorProps> = ({ textColor = 'black' }) => {
  const [letters, setLetters] = useState({ first: '', second: '' })
  const [isHovering, setIsHovering] = useState(false)

  const generateLetters = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYZ'
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
    const interval = setInterval(
      generateLetters,
      isHovering && window.innerWidth >= 1024 ? 50 : 3000,
    )
    return () => clearInterval(interval)
  }, [isHovering])

  return (
    <Link href="/">
      <div
        className="w-[250px]"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <svg viewBox="0 0 600 100" className="w-full" preserveAspectRatio="xMinYMid meet">
          {/* Random Letters */}
          <text
            x="20"
            y="75"
            className="text-[70px] font-bold"
            style={{
              fontFamily: 'Transluoghi',
              fill: textColor,
            }}
          >
            {letters.first}
            {letters.second}
          </text>

          {/* Text Block */}
          <g transform="translate(310, 28)">
            <text
              className="text-[24px] font-semibold"
              style={{
                fontFamily: 'sans-serif',
                fill: textColor,
              }}
            >
              Transluoghi
            </text>
            <text
              y="26"
              className="text-[24px]"
              style={{
                fontFamily: 'sans-serif',
                fill: textColor,
              }}
            >
              Ecomuseo del Bussento
            </text>
            <text
              x="87"
              y="51"
              className="text-[24px]"
              style={{
                fontFamily: 'sans-serif',
                fill: textColor,
              }}
            >
              Contemporaneo
            </text>
          </g>
        </svg>
      </div>
    </Link>
  )
}

export default LogoGenerator
