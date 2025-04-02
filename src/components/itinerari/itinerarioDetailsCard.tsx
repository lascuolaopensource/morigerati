'use client'
import { type Itinerari } from '@/payload-types'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/components/TranslationProvider'

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
  t: (key: string, defaultValue?: string) => string
}

const TipoSection = ({ tipo, letter, unavailableText, t }: TipoSectionProps) => {
  const formatTipo = (tipoValue: typeof tipo) => {
    if (!tipoValue?.length) return unavailableText

    if (typeof tipoValue === 'object' && !Array.isArray(tipoValue)) {
      // Handle the case where tipo might be a localized object
      return unavailableText
    }

    // Translate each tipo value using the translations
    if (Array.isArray(tipoValue)) {
      return tipoValue.map((type) => t(`common:itinerari.types.${type}`, type)).join(', ')
    }

    return t(`common:itinerari.types.${tipoValue}`, tipoValue as string)
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
  const { t } = useTranslation()

  // Translation values
  const unavailableText = t('common:strings.notAvailable', 'Non disponibile')
  const lengthLabel = t('common:itinerari.length', 'lunghezza')
  const durationLabel = t('common:itinerari.duration', 'durata')
  const elevationLabel = t('common:itinerari.elevation', 'dislivello')
  const difficultyLabel = t('common:itinerari.difficulty', 'difficoltà')
  const typeLabel = t('common:itinerari.type', 'tipo')

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
      return t(`common:itinerari.difficulties.${value}`, value)
    }

    // Translate the unit if provided
    const translatedUnit = unit ? t(`common:itinerari.units.${unit}`, unit) : ''
    return unit ? `${value} ${translatedUnit}` : value
  }

  return (
    <div className="pt-5 grid gap-2 w-full">
      <TipoSection tipo={tipo} letter={letters[0] || ''} unavailableText={unavailableText} t={t} />
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
