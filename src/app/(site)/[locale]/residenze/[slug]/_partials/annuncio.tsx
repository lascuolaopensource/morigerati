'use client'
import React, { useState, useEffect } from 'react'

const generateRandomLetter = (): string => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
  return alphabet[Math.floor(Math.random() * alphabet.length)]
}

interface DateDaDefinireBannerProps {
  datesNotAnnouncedText?: string
}

const DateDaDefinireBanner: React.FC<DateDaDefinireBannerProps> = ({
  datesNotAnnouncedText = 'Le date non sono state ancora annunciate, torna presto!',
}) => {
  const [letter, setLetter] = useState<string>('a')

  useEffect(() => {
    setLetter(generateRandomLetter())
  }, [])

  return (
    <div className="w-full bg-residenzeColor/20 p-2 text-black relative min-h-[60px] flex flex-col justify-center overflow-hidden">
      <span className="absolute -top-4 -right-1 text-7xl text-residenzeColorScuro/5 font-bold font-transluoghi z-0">
        {letter}
      </span>
      <span className="text-lg break-words overflow-hidden text-center text-residenzeColor">
        {datesNotAnnouncedText}
      </span>
    </div>
  )
}

export default DateDaDefinireBanner
