'use client'

import { useState, useEffect } from 'react'
import { useMessages } from 'next-intl'

const NoResidenze = () => {
  const [randomLetter, setRandomLetter] = useState('')
  const messages = useMessages()

  useEffect(() => {
    const letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]
    setRandomLetter(letter)
  }, [])

  return (
    <div className="w-full flex flex-col items-center justify-center relative overflow-hidden">
      <div className="relative z-10 text-center space-y-4">
        <h2 className="text-3xl font-medium">{messages.residenze.noResidenze}</h2>
        <p className="text-lg text-gray-600">{messages.residenze.checkPastResidenze}</p>
      </div>
    </div>
  )
}

export default NoResidenze
