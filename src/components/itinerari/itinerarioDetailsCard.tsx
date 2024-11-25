'use client'
import { type Itinerari } from '@/payload-types'
import { useState, useEffect } from 'react'

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
}

const DetailSection = ({ label, value, letter }: DetailSectionProps) => {
  return (
    <div className="h-full bg-itinerariColor/20 p-2 text-black relative overflow-hidden">
      <span className="absolute -top-4 -right-1 text-7xl text-itinerariColor/15 font-bold font-transluoghi z-0">
        {letter}
      </span>
      <div className="flex flex-col relative z-1">
        <span className="text-xs uppercase">{label}</span>
        <span className="text-lg">{value ?? 'Non disponibile'}</span>
      </div>
    </div>
  )
}

interface TipoSectionProps {
  tipo: ItinerarioDetailsProps['tipo']
  letter: string
}

const TipoSection = ({ tipo, letter }: TipoSectionProps) => {
  const formatTipo = (tipoValue: typeof tipo) => {
    if (!tipoValue?.length) return 'Tipo non disponibile'
    return tipoValue.join(', ')
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

  useEffect(() => {
    const newLetters: string[] = []
    for (let i = 0; i < 5; i++) {
      newLetters.push(generateRandomLetter(newLetters))
    }
    setLetters(newLetters)
  }, [])

  const formatValue = (value: string | number | null | undefined, unit?: string) => {
    if (!value) return 'Non disponibile'
    return unit ? `${value} ${unit}` : value
  }

  return (
    <div className="pt-5 grid gap-2 bg-white w-full">
      <TipoSection tipo={tipo} letter={letters[0] || ''} />
      <div className="grid grid-cols-2 gap-2 w-full">
        <DetailSection
          label="lunghezza"
          value={formatValue(lunghezza, 'km')}
          letter={letters[1] || ''}
        />
        <DetailSection label="durata" value={formatValue(tempo, 'ore')} letter={letters[2] || ''} />
        <DetailSection
          label="dislivello"
          value={formatValue(dislivello, 'mt')}
          letter={letters[3] || ''}
        />
        <DetailSection
          label="difficoltà"
          value={formatValue(difficolta)}
          letter={letters[4] || ''}
        />
      </div>
    </div>
  )
}
