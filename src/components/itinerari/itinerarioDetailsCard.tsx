'use client'
//Boilerplate
import { useState, useEffect } from 'react'
//DB
import { type Itinerari } from '@/payload-types'
//Locale
import { useMessages } from 'next-intl'

const generateRandomLetter = (usedLetters: string[]): string => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
  const availableLetters = alphabet.filter((letter) => !usedLetters.includes(letter))
  return availableLetters[Math.floor(Math.random() * availableLetters.length)]
}

type ItinerarioDetailsProps = Pick<
  Itinerari,
  'lunghezza' | 'tempo' | 'dislivello' | 'difficolta' | 'tipo'
>

interface DetailSectionProps {
  label: string
  value: string | number | null | undefined
  letter: string
  unavailableText: string
}

const DetailSection = ({ label, value, letter, unavailableText }: DetailSectionProps) => {
  return (
    <div className="h-full bg-itinerariColor/20 p-2 text-black relative overflow-hidden">
      <span className="absolute -top-4 -right-1 text-7xl text-itinerariColor/15 font-bold font-transluoghi z-0">
        {letter}
      </span>
      <div className="flex flex-col relative z-1">
        <span className="text-xs uppercase">{label}</span>
        <span className="text-lg">{value ?? unavailableText}</span>
      </div>
    </div>
  )
}

interface TipoSectionProps {
  tipo: ItinerarioDetailsProps['tipo']
  letter: string
  unavailableText: string
}

const TipoSection = ({ tipo, letter, unavailableText }: TipoSectionProps) => {
  const formatTipo = (tipoValue: typeof tipo) => {
    const messages = useMessages()
    if (!tipoValue?.length) return unavailableText

    if (typeof tipoValue === 'object' && !Array.isArray(tipoValue)) {
      // Handle the case where tipo might be a localized object
      return unavailableText
    }

    // Translate each tipo value using the translations
    if (Array.isArray(tipoValue)) {
      return tipoValue.map((type) => messages?.itinerari?.types?.[type]).join(', ')
    }

    return messages?.itinerari?.types?.[tipoValue as string]
  }

  return (
    <div className="w-full bg-itinerariColor/20 p-2 text-black relative min-h-[60px] flex items-center justify-center overflow-hidden">
      <span className="absolute -top-4 -right-1 text-7xl text-itinerariColor/15 font-bold font-transluoghi z-0">
        {letter}
      </span>
      <span className="text-xs uppercase absolute top-2 left-2 z-1">Tipo</span>
      <span className="text-2xl relative z-1">{formatTipo(tipo)}</span>
    </div>
  )
}

export default function ItinerarioDetailsCard({
  lunghezza,
  tempo,
  dislivello,
  difficolta,
  tipo,
}: ItinerarioDetailsProps) {
  const [letters, setLetters] = useState<string[]>([])
  const messages = useMessages()

  // Translation values
  const unavailableText = messages?.itinerari?.notAvailable
  const lengthLabel = messages?.itinerari?.length
  const durationLabel = messages?.itinerari?.duration
  const elevationLabel = messages?.itinerari?.elevation
  const difficultyLabel = messages?.itinerari?.difficulty

  useEffect(() => {
    const newLetters: string[] = []
    for (let i = 0; i < 5; i++) {
      newLetters.push(generateRandomLetter(newLetters))
    }
    setLetters(newLetters)
  }, [])

  const formatValue = (value: string | number | null | undefined, unit?: string) => {
    if (!value) return unavailableText

    // Handle value that might be a localized object
    if (typeof value === 'object' && value !== null) {
      return unavailableText
    }

    // If the value is a difficulty, translate it
    if (typeof value === 'string' && value.includes(' - ')) {
      return messages?.itinerari?.difficulties?.[value]
    }

    // Translate the unit if provided
    const translatedUnit = unit ? messages?.itinerari?.units?.[unit] : ''
    return unit ? `${value} ${translatedUnit}` : value
  }

  return (
    <div className="pt-5 grid gap-2 w-full">
      <TipoSection tipo={tipo} letter={letters[0] || ''} unavailableText={unavailableText} />
      <div className="grid grid-cols-2 gap-2 w-full">
        <DetailSection
          label={lengthLabel}
          value={formatValue(lunghezza, 'km')}
          letter={letters[1] || ''}
          unavailableText={unavailableText}
        />
        <DetailSection
          label={durationLabel}
          value={formatValue(tempo, 'ore')}
          letter={letters[2] || ''}
          unavailableText={unavailableText}
        />
        <DetailSection
          label={elevationLabel}
          value={formatValue(dislivello, 'mt')}
          letter={letters[3] || ''}
          unavailableText={unavailableText}
        />
        <DetailSection
          label={difficultyLabel}
          value={formatValue(difficolta)}
          letter={letters[4] || ''}
          unavailableText={unavailableText}
        />
      </div>
    </div>
  )
}
