import React from 'react'
import Link from 'next/link'

const PulsanteIscrizione: React.FC<{ link: string; show: boolean }> = ({ link, show }) => {
  if (!show) return null
  return (
    <div className="flex justify-center pt-5 pb-5 ">
      <div className="flex flex-col justify-center h-12 px-8 rounded-full bg-residenzeColor transition-transform duration-300 ease-in-out cursor-pointer hover:scale-105">
        <Link className="text-center font-bold" href={link}>
          iscriviti
        </Link>
      </div>
    </div>
  )
}

export default PulsanteIscrizione
