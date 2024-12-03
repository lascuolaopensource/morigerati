'use client'
import { type Residenze } from '@/payload-types'
import formatDate from '@/utils/formatDate'
import { useState, useEffect } from 'react'

const generateRandomLetter = (usedLetters: string[]): string => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
  const availableLetters = alphabet.filter((letter) => !usedLetters.includes(letter))
  return availableLetters[Math.floor(Math.random() * availableLetters.length)]
}

interface InfoResidenzaProps {
  residenza: Residenze
  onlyDate?: boolean
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
}

const AddressSection = ({ address, letter }: AddressSectionProps) => {
  return (
    <div className="w-full bg-residenzeColor/20 p-2 text-black relative min-h-[60px] flex flex-col justify-center overflow-hidden">
      <span className="absolute -top-4 -right-1 text-7xl text-[#f1bca5] font-bold font-transluoghi z-0 select-none">
        {letter}
      </span>
      <span className="text-xs  font-thin mb-1">Indirizzo</span>
      <span className="text-lg break-words overflow-hidden">{address ?? 'Non disponibile'}</span>
    </div>
  )
}

const InfoResidenza = ({ residenza, onlyDate = false }: InfoResidenzaProps) => {
  const [letters, setLetters] = useState<string[]>([])

  useEffect(() => {
    const newLetters: string[] = []
    for (let i = 0; i < 4; i++) {
      newLetters.push(generateRandomLetter(newLetters))
    }
    setLetters(newLetters)
  }, [])

  if (onlyDate && residenza.data_inizio && residenza.data_fine) {
    return (
      <div className="w-full overflow-hidden">
        <h3 className="text-residenzeColor text-lg text-right break-words">
          {formatDate(residenza.data_inizio, 'Data da definire')} →{' '}
          {formatDate(residenza.data_fine, 'Data da definire')}
        </h3>
      </div>
    )
  }

  return (
    <div className="grid gap-2 w-full">
      <AddressSection address={residenza.indirizzo} letter={letters[0] || 'a'} />
      <div className="grid grid-cols-2 gap-2 w-full">
        <DetailSection
          label="Data inizio"
          value={formatDate(residenza.data_inizio, 'Data da definire')}
          letter={letters[1] || 'b'}
        />
        <DetailSection
          label="Data fine"
          value={formatDate(residenza.data_fine, 'Data da definire')}
          letter={letters[2] || 'c'}
        />
      </div>
      <DetailSection
        label="Deadline iscrizioni"
        value={formatDate(residenza.deadline_iscrizione, 'Data da definire')}
        letter={letters[3] || 'd'}
      />
    </div>
  )
}

export default InfoResidenza
