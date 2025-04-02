'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from '@/components/TranslationProvider'

const NoResidenze = () => {
  const [randomLetter, setRandomLetter] = useState('')
  const { t } = useTranslation()

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
        <h2 className="text-3xl font-medium">{t('residences:noResidences')}</h2>
        <p className="text-lg text-gray-600">{t('residences:checkPastResidences')}</p>
      </div>
    </div>
  )
}

export default NoResidenze
