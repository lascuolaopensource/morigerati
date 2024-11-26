'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react'
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
      <div className="relative pt-3">
        {/* Background letter */}

        <div className="absolute inset-0">
          <span className="absolute inset-0 flex items-center justify-center text-[10rem] sm:text-[20rem] text-itinerariColor/5 font-bold font-transluoghi pointer-events-none select-none">
            {bgLetter}
          </span>
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10 pb-16">
          <h2 className="text-2xl font-semibold mb-3 text-center">Servizi</h2>
          <div className="flex flex-wrap justify-center gap-4 px-6">
            {servizi.map((servizio, index) => (
              <div
                key={servizio.id || index}
                className="w-full sm:w-[calc(45%-1rem)] md:w-[calc(30%-1rem)] lg:w-[calc(23%-1rem)] max-w-sm relative"
              >
                <ServizioCard nome={servizio.nome} testo={servizio.testo} link={servizio.link} />
              </div>
            ))}
          </div>
        </div>
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
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const availableLetters = alphabet.filter((letter) => !usedLetters.includes(letter))
  return availableLetters[Math.floor(Math.random() * availableLetters.length)]
}

const ServizioCard: React.FC<ServizioCardProps> = ({ nome, testo, link }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [letter, setLetter] = useState('')
  const [hasOverflow, setHasOverflow] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const textContent = useMemo(() => (testo?.root ? renderElement(testo.root) : ''), [testo])

  useEffect(() => {
    setLetter(generateRandomLetter([]))
  }, [])

  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const hasOverflow = contentRef.current.scrollHeight > contentRef.current.clientHeight
        setHasOverflow(hasOverflow)
      }
    }

    checkOverflow()
    window.addEventListener('load', checkOverflow)
    return () => window.removeEventListener('load', checkOverflow)
  }, [textContent])

  return (
    <div
      className={`bg-white rounded-lg p-3 relative transition-all duration-300 ease-in-out overflow-hidden ${
        isExpanded ? 'absolute inset-x-0 min-h-[200px] z-10 shadow-lg' : 'h-[200px]'
      }`}
    >
      <div className="absolute inset-0">
        <span className="absolute -top-4 -right-1 text-7xl text-itinerariColor/15 font-bold font-transluoghi">
          {letter}
        </span>
      </div>

      <div className="relative h-full flex flex-col">
        <h3 className="text-lg font-bold mb-2">{nome}</h3>

        <div className="flex-1 overflow-hidden">
          <div
            ref={contentRef}
            className={`text-[10px] transition-all duration-300 ${
              !isExpanded ? 'line-clamp-6' : ''
            }`}
          >
            {textContent}
          </div>

          {!isExpanded && hasOverflow && (
            <div className="absolute bottom-8 inset-x-0 h-8 bg-gradient-to-t from-white to-transparent" />
          )}
        </div>

        <div className="flex justify-between items-center mt-auto pt-2">
          <div>
            {hasOverflow && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[10px] text-gray-600 hover:text-gray-800 underline transition-colors"
              >
                {isExpanded ? 'Mostra meno' : 'Mostra tutto'}
              </button>
            )}
          </div>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-6 w-16 text-[10px] font-semibold bg-itinerariColor text-black rounded-full transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-itinerariColor"
            >
              Prenota
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export { ServiziCardWrapper, ServizioCard }
