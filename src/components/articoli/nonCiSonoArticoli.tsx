'use client'

import { useState, useEffect } from 'react'

const NoArticoli = () => {
  const [randomLetter, setRandomLetter] = useState('')

  useEffect(() => {
    const letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]
    setRandomLetter(letter)
  }, [])

  return (
    <div className="w-full h-[50vh] flex flex-col items-center justify-center relative overflow-hidden">
      <span className="absolute top-16  text-[12rem] text-residenzeColor/15 font-bold font-transluoghi z-0">
        {randomLetter.toLowerCase()}
      </span>
      <div className="relative z-10 text-center space-y-4">
        <h2 className="text-3xl font-medium">Per il momento, non ci sono articoli!</h2>
      </div>
    </div>
  )
}

export default NoArticoli
