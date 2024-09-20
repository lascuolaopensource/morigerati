import React from 'react'
import { Itinerari } from '@/payload-types'

type ItinerarioDetailsProps = Pick<
  Itinerari,
  'lunghezza' | 'tempo' | 'dislivello' | 'difficolta' | 'tipo'
>

const ItinerarioDetailsCard: React.FC<ItinerarioDetailsProps> = ({
  lunghezza,
  tempo,
  dislivello,
  difficolta,
  tipo,
}) => {
  const renderDetail = (label: string, value: string | number | null | undefined) => (
    <div className="bg-black text-white p-2 border-y-4 border-r-4">
      <div className="flex flex-col h-full justify-between">
        <span className="text-[12px]">{label}</span>
        <span className="text-xl font-bold">{value ?? 'N/A'}</span>
      </div>
    </div>
  )

  const formatTipo = (tipo: ('tipo-0' | 'tipo-1' | 'tipo-2')[] | null | undefined) => {
    if (!tipo || tipo.length === 0) return 'N/A'
    return tipo.join(', ')
  }

  return (
    <div className="grid grid-cols-2 gap-px bg-white">
      <div className="bg-black text-white p-2 border-b-4 col-span-2">
        <div className="flex h-full justify-center">
          <span className="text-xl font-bold">{formatTipo(tipo)}</span>
        </div>
      </div>
      {renderDetail('lunghezza', lunghezza ? `${lunghezza} km` : 'N/A')}
      {renderDetail('durata', `${tempo} ore` ?? 'N/A')}
      {renderDetail('dislivello', dislivello ? `${dislivello} mt` : 'N/A')}
      {renderDetail('difficoltà', difficolta ?? 'N/A')}
    </div>
  )
}

export default ItinerarioDetailsCard
