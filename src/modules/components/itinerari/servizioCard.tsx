'use client'
//Boilerplate
import React, { useState, useEffect, useRef, useMemo } from 'react'
//DB
import type { Itinerari } from '@/payload-types'
//Components
import renderElement from '@/modules/utils/renderElement'
//Locale
import { useMessages } from 'next-intl'

type Servizio = NonNullable<Itinerari['servizi']>[number]

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

const ServizioCardComponent: React.FC<ServizioCardProps> = ({ nome, testo, link }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [letter, setLetter] = useState('')
  const [hasOverflow, setHasOverflow] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const messages = useMessages()
  const locale = messages.locale

  // Process text content safely, handling potential localized content
  const textContent = useMemo(() => {
    // If testo is a localized object with it/en keys
    if (testo && typeof testo === 'object' && !testo.root && ('it' in testo || 'en' in testo)) {
      const localizedText = (testo[locale] || testo['it'] || testo['en']) as { root?: any }
      return localizedText?.root ? renderElement(localizedText.root) : ''
    }

    // Regular rich text object
    return testo?.root ? renderElement(testo.root) : ''
  }, [testo, locale])

  // Process nome to handle potential localization
  const displayName = useMemo(() => {
    if (nome && typeof nome === 'object' && ('it' in nome || 'en' in nome)) {
      return nome[locale] || nome['it'] || nome['en'] || ''
    }
    return nome || ''
  }, [nome, locale])

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
      className={`bg-white rounded-lg p-2 pt-1 relative transition-all duration-300 ease-in-out overflow-hidden border-2 border-itinerariColor ${
        isExpanded ? 'absolute inset-x-0 min-h-[200px] z-10 shadow-lg' : 'h-[200px]'
      }`}
    >
      <div className="absolute inset-0">
        <span className="absolute -top-4 -right-1 text-7xl text-itinerariColor/15 font-bold font-transluoghi">
          {letter}
        </span>
      </div>

      <div className="relative h-full flex flex-col">
        <h3 className="text-lg font-medium mb-1">{displayName}</h3>
        <div className="flex-1 overflow-hidden">
          <div
            ref={contentRef}
            className={`text-[8px] transition-all duration-300 ${
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
            {(hasOverflow || isExpanded) && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[10px] text-gray-600 hover:text-gray-800 underline transition-colors"
              >
                {isExpanded ? messages.luoghi.servizi.less : messages.luoghi.servizi.more}
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
              {messages.luoghi.servizi.book}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export { ServizioCardComponent }
