'use client'
import React, { useState, useEffect } from 'react'

interface RandomLetterProps {
  position?: 'left' | 'right'
  color?: 'itinerari' | 'luoghi' | 'stakeholders' | 'residenze' | 'articoli'
}

const generateRandomLetter = (): string => {
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26))
  return Math.random() > 0.5 ? letter.toLowerCase() : letter
}

const RandomLetter: React.FC<RandomLetterProps> = ({ position = 'right', color = 'itinerari' }) => {
  const [letter, setLetter] = useState('')

  useEffect(() => {
    setLetter(generateRandomLetter())
  }, [])

  const colore = {
    itinerari: 'text-itinerariColor/100',
    luoghi: 'text-luoghiColor',
    stakeholders: 'text-stakeholdersColor',
    residenze: 'text-residenzeColor',
    articoli: 'text-itinerariColor/100',
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none -z-50">
      <div
        className={`
          absolute 
          whitespace-nowrap
          ${position === 'left' ? '-translate-x-1/4' : 'translate-x-1/4'}
        `}
        style={{ userSelect: 'none' }}
        aria-hidden="true"
      >
        <span
          className={`
            ${colore[color]} 
            opacity-20 
            font-transluoghi 
            block 
            select-none

          `}
          style={{
            fontSize: 'min(40vw, 300px)',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
          }}
        >
          {letter}
        </span>
      </div>
    </div>
  )
}

export { RandomLetter }
