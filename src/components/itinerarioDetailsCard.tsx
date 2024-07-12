import React from 'react'

interface ItinerarioDetailsProps {
  lunghezza: number
  tempo: number
  dislivello: number
  difficolta: string
  tipo: string[]
}

const ItinerarioDetailsCard: React.FC<ItinerarioDetailsProps> = ({
  lunghezza,
  tempo,
  dislivello,
  difficolta,
  tipo,
}) => {
  return (
    <div className="grid grid-cols-2 gap-px bg-white">
      <div className="bg-black text-white p-2 border-b-4 col-span-2">
        <div className="flex h-full justify-center">
          <span className="text-xl font-bold">{tipo.join(', ')}</span>
        </div>
      </div>
      <div className="bg-black text-white p-2 border-y-4 border-r-4">
        <div className="flex flex-col h-full justify-between">
          <span className="text-[12px]">lunghezza</span>
          <span className="text-xl font-bold">{lunghezza} km</span>
        </div>
      </div>

      <div className="bg-black text-white p-2 border-y-4 border-l-4">
        <div className="flex flex-col h-full justify-between">
          <span className="text-[12px]">durata</span>
          <span className="text-xl font-bold">{tempo}</span>
        </div>
      </div>

      <div className="bg-black text-white p-2 border-y-4 border-r-4">
        <div className="flex flex-col h-full justify-between">
          <span className="text-[12px]">dislivello</span>
          <span className="text-xl font-bold">{dislivello} mt</span>
        </div>
      </div>
      <div className="bg-black text-white p-2 border-y-4 border-l-4">
        <div className="flex flex-col h-full justify-between">
          <span className="text-[12px]">difficoltà</span>
          <span className="text-xl font-bold">{difficolta}</span>
        </div>
      </div>
    </div>
  )
}

export default ItinerarioDetailsCard
