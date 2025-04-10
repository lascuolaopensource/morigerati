import React from 'react'
import Link from 'next/link'
import { FaPen } from 'react-icons/fa'

interface PulsanteIscrizioneProps {
  link: string
  show: boolean
  buttonText?: string
  isArchived?: boolean
}

const PulsanteIscrizione: React.FC<PulsanteIscrizioneProps> = ({
  link,
  show,
  buttonText = 'iscriviti',
  isArchived = false,
}) => {
  if (!show || isArchived) return null

  return (
    <div className="flex justify-center pt-5 pb-5">
      <div className="flex flex-row items-center justify-center h-12 px-16 rounded-full bg-residenzeColor transition-transform duration-300 ease-in-out cursor-pointer hover:scale-105 group">
        <Link className="text-center font-bold flex items-center gap-2" href={link}>
          <FaPen className="text-sm transition-transform duration-300 ease-in-out group-hover:rotate-[20deg]" />{' '}
          {buttonText}
        </Link>
      </div>
    </div>
  )
}

export default PulsanteIscrizione
