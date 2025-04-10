'use client'
import { type Residenze } from '@/payload-types'
import { formatDate } from '@/utils/formatDate'
import { useState, useEffect } from 'react'
import { Locale } from '@/utils/localization'

const generateRandomLetter = (usedLetters: string[]): string => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
  const availableLetters = alphabet.filter((letter) => !usedLetters.includes(letter))
  return availableLetters[Math.floor(Math.random() * availableLetters.length)]
}

interface InfoResidenzaProps {
  residenza: Residenze
  onlyDate?: boolean
  locale?: Locale
  translations?: {
    address?: string
    notAvailable?: string
    startDate?: string
    endDate?: string
    registrationDeadline?: string
    dateToBeDefined?: string
  }
}

interface DetailSectionProps {
  label: string
  value: string
  letter: string
}

const DetailSection = ({ label, value, letter }: DetailSectionProps) => {
  return (
    <div className="h-full bg-residenzeColor/20 p-2 text-black relative overflow-hidden">
      <span className="absolute -top-4 -right-1 text-7xl text-[#f1bca5] font-bold font-transluoghi z-0 select-none">
        {letter}
      </span>
      <div className="flex flex-col relative z-1">
        <span className="text-xs  font-medium">{label}</span>
        <span className="text-base break-words overflow-hidden">{value}</span>
      </div>
    </div>
  )
}

interface AddressSectionProps {
  address: string | undefined | null
  letter: string
  addressLabel: string
  notAvailableText: string
}

const AddressSection = ({
  address,
  letter,
  addressLabel,
  notAvailableText,
}: AddressSectionProps) => {
  return (
    <div className="w-full bg-residenzeColor/20 p-2 text-black relative min-h-[60px] flex flex-col justify-center overflow-hidden">
      <span className="absolute -top-4 -right-1 text-7xl text-[#f1bca5] font-bold font-transluoghi z-0 select-none">
        {letter}
      </span>
      <span className="text-xs font-thin mb-1">{addressLabel}</span>
      <span className="text-lg break-words overflow-hidden">{address ?? notAvailableText}</span>
    </div>
  )
}

const InfoResidenza = ({
  residenza,
  onlyDate = false,
  locale = 'it',
  translations = {},
}: InfoResidenzaProps) => {
  const [letters, setLetters] = useState<string[]>([])

  // Default translations with fallbacks
  const {
    address = 'Indirizzo',
    notAvailable = 'Non disponibile',
    startDate = 'Data inizio',
    endDate = 'Data fine',
    registrationDeadline = 'Deadline iscrizioni',
    dateToBeDefined = 'Data da definire',
  } = translations

  useEffect(() => {
    const newLetters: string[] = []
    for (let i = 0; i < 4; i++) {
      newLetters.push(generateRandomLetter(newLetters))
    }
    setLetters(newLetters)
  }, [])

  // Get localized address
  const getLocalizedAddress = () => {
    if (typeof residenza.indirizzo === 'object' && residenza.indirizzo !== null) {
      return residenza.indirizzo[locale] || ''
    }
    return residenza.indirizzo || ''
  }

  if (onlyDate && residenza.data_inizio && residenza.data_fine) {
    return (
      <div className="w-full overflow-hidden">
        <h3 className="text-residenzeColor text-lg text-right break-words">
          {formatDate(residenza.data_inizio, dateToBeDefined, false, locale)} →{' '}
          {formatDate(residenza.data_fine, dateToBeDefined, false, locale)}
        </h3>
      </div>
    )
  }

  return (
    <div className="grid gap-2 w-full">
      <AddressSection
        address={getLocalizedAddress()}
        letter={letters[0] || 'a'}
        addressLabel={address}
        notAvailableText={notAvailable}
      />
      <div className="grid grid-cols-2 gap-2 w-full">
        <DetailSection
          label={startDate}
          value={formatDate(residenza.data_inizio, dateToBeDefined, false, locale)}
          letter={letters[1] || 'b'}
        />
        <DetailSection
          label={endDate}
          value={formatDate(residenza.data_fine, dateToBeDefined, false, locale)}
          letter={letters[2] || 'c'}
        />
      </div>
      <DetailSection
        label={registrationDeadline}
        value={formatDate(residenza.deadline_iscrizione, dateToBeDefined, false, locale)}
        letter={letters[3] || 'd'}
      />
    </div>
  )
}

export default InfoResidenza
