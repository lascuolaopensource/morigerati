'use client'
//Boilerplate
import React, { useState, useEffect } from 'react'
//DB
import type { Itinerari } from '@/payload-types'
//Components
import { ServizioCardComponent } from './servizioCard'
//Locale
import { useMessages } from 'next-intl'

type Servizio = NonNullable<Itinerari['servizi']>[number]

interface ServiziWrapperProps {
  servizi: Itinerari['servizi']
}

const generateRandomLetter = (usedLetters: string[]): string => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const availableLetters = alphabet.filter((letter) => !usedLetters.includes(letter))
  return availableLetters[Math.floor(Math.random() * availableLetters.length)]
}

const ServiziCardWrapper: React.FC<ServiziWrapperProps> = ({ servizi }) => {
  const [bgLetter, setBgLetter] = useState('')
  const messages = useMessages()

  useEffect(() => {
    setBgLetter(generateRandomLetter([]))
  }, [])

  // Safety check for servizi array
  if (!servizi || !Array.isArray(servizi) || servizi.length === 0) {
    return null
  }

  return (
    <div className="relative overflow-hidden">
      <div className="relative pt-3">
        {/* Background letter */}
        <div className="absolute inset-0">
          <span className="absolute inset-0 flex items-center justify-center text-[10rem] sm:text-[20rem] text-itinerariColor/5 font-bold font-transluoghi pointer-events-none select-none">
            {bgLetter}
          </span>
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10 pb-16">
          <h2 className="text-2xl font-semibold mb-3 text-center">
            {messages.luoghi.servizi.title}
          </h2>
          <div className="flex flex-wrap justify-center gap-4 px-6">
            {servizi.map((servizio, index) => {
              // Skip if servizio is not a proper object
              if (!servizio || typeof servizio !== 'object') return null

              return (
                <div
                  key={servizio.id || index}
                  className="w-full sm:w-[calc(50%-0.5rem)] max-w-sm relative"
                >
                  <ServizioCardComponent
                    nome={servizio.nome}
                    testo={servizio.testo}
                    link={servizio.link}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export { ServiziCardWrapper }
