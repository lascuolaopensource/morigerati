'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Itinerari } from '@/payload-types'
import renderElement from '@/utils/renderElement'

type Servizio = NonNullable<Itinerari['servizi']>[number]

interface ServiziWrapperProps {
  servizi: Itinerari['servizi']
}

const ServiziCardWrapper: React.FC<ServiziWrapperProps> = ({ servizi }) => {
  const [bgLetter, setBgLetter] = useState('')

  useEffect(() => {
    setBgLetter(generateRandomLetter([]))
  }, [])

  if (!servizi || servizi.length === 0) {
    return null
  }

  return (
    <div className="relative overflow-hidden">
      {/* Main content with background and gradients */}
      <div className="relative bg-white">
        {/* Top fade */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white via-white/90 to-transparent z-10" />
        {/* Content section with background */}
        <div className="relative pt-5">
          <div className="bg-itinerariColor/20 w-full">
            {/* Side fades */}
            <div className="absolute left-0 inset-y-0 w-10 sm:w-12 bg-gradient-to-r from-white to-transparent" />
            <div className="absolute right-0 inset-y-0 w-10 sm:w-12 bg-gradient-to-l from-white to-transparent" />

            {/* Background letter */}
            {/*             <span className="absolute inset-0 flex items-center justify-center text-[10rem] sm:text-[20rem] text-itinerariColor/5 font-bold font-transluoghi pointer-events-none select-none">
              {bgLetter}
            </span> */}

            {/* Main content */}
            <div className="max-w-[1000px] mx-auto relative z-10 pb-20">
              <h2 className="text-3xl font-semibold mb-4 bt-1 text-center">Servizi</h2>
              <div className="flex flex-wrap justify-center gap-4 px-8">
                {servizi.map((servizio, index) => (
                  <div
                    key={servizio.id || index}
                    className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] max-w-md h-[280px] [&:has(.expanded)]:h-auto"
                  >
                    <ServizioCard
                      nome={servizio.nome}
                      testo={servizio.testo}
                      link={servizio.link}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white via-white to-transparent z-10" />
      </div>
    </div>
  )
}

interface ServizioCardProps {
  nome: Servizio['nome']
  testo: Servizio['testo']
  link: Servizio['link']
}

const generateRandomLetter = (usedLetters: string[]): string => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
  const availableLetters = alphabet.filter((letter) => !usedLetters.includes(letter))
  return availableLetters[Math.floor(Math.random() * availableLetters.length)]
}

const ServizioCard: React.FC<ServizioCardProps> = ({ nome, testo, link }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const [letter, setLetter] = useState('')
  const textContent = testo?.root ? renderElement(testo.root) : ''
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setLetter(generateRandomLetter([]))
  }, [])

  useEffect(() => {
    if (contentRef.current) {
      setIsOverflowing(contentRef.current.scrollHeight > 150)
    }
  }, [textContent])

  return (
    <div
      className={`bg-white rounded-lg overflow-hidden p-4 relative h-full ${isExpanded ? 'expanded' : ''}`}
    >
      <span className="absolute -top-4 -right-1 text-7xl text-itinerariColor/15 font-bold font-transluoghi z-0">
        {letter}
      </span>
      <div className="relative z-1 h-full flex flex-col">
        <div className={`${isExpanded ? '' : 'flex-1 overflow-hidden'}`}>
          <h3 className="text-xl font-bold mb-2">{nome}</h3>
          <div
            className={`relative ${!isExpanded && isOverflowing ? 'max-h-[150px] overflow-hidden' : ''}`}
          >
            <div ref={contentRef} className="text-xs">
              {textContent}
            </div>
            {!isExpanded && isOverflowing && (
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
            )}
          </div>
        </div>
        <div className="flex justify-between items-center h-8 mt-4">
          <div>
            {isOverflowing && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-black font-medium underline"
              >
                {isExpanded ? 'Comprimi' : 'Espandi'}
              </button>
            )}
          </div>
          <div>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-8 w-20 text-xs font-semibold bg-itinerariColor text-black rounded-full transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-itinerariColor"
              >
                Prenota
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export { ServiziCardWrapper, ServizioCard }
