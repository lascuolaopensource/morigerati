import React from 'react'
import Link from 'next/link'

const PulsanteVediTutti: React.FC = () => {
  return (
    <div className="flex justify-center ">
      <div className="flex flex-col justify-center h-7  rounded-md bg-[#7FCBAE] border-2 border-black transition-transform duration-300 ease-in-out hover:scale-110">
        <Link className="text-center p-2 font-bold" href={'/articoli/tutti'}>
          vedi tutti
        </Link>
      </div>
    </div>
  )
}

export default PulsanteVediTutti
