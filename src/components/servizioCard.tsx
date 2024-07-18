import React from 'react'
import renderElement, { RootNode } from '@/utils/renderElement'

interface ServizioProps {
  nome: string
  testo: {
    root: RootNode
  }
  link: string
}

const ServizioCard: React.FC<ServizioProps> = ({ nome, testo, link }) => {
  return (
    <div className="border-2 border-black rounded-lg overflow-hidden flex">
      <div className="w-3/4 p-4">
        <h3 className="text-xl font-bold mb-2">{nome}</h3>
        <div className="text-xs mb-4">{renderElement([testo.root])}</div>
        <a
          href={link}
          className=" border-2 border-black inline-block bg-itinerarioColor text-black px-4 py-2 rounded-md "
        >
          prenota
        </a>
      </div>
      <div className="w-1/4 bg-gray-200">{/* img */}</div>
    </div>
  )
}

export default ServizioCard
