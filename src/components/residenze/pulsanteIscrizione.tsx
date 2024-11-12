import React from 'react'
import Link from 'next/link'

const PulsanteIscrizione: React.FC<{ link: string; show: boolean }> = ({ link, show }) => {
  if (!show) return null
  return (
    <div className="flex justify-center pt-5 pb-5 ">
      <div className="flex flex-col justify-center h-7 w-20 rounded-md bg-[#7FCBAE] border-2 border-black transition-transform duration-300 ease-in-out cursor-pointer hover:scale-110">
        <Link className="text-center p-2 font-bold" href={link}>
          iscriviti
        </Link>
      </div>
    </div>
  )
}

export default PulsanteIscrizione
