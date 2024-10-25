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
    <div className="bg-black text-white border-white p-2 border-y-4 border-r-4 h-24">
      <div className="flex flex-col h-full justify-between">
        <div className="h-6"></div>
        <span className="text-[12px]">{label}</span>
        <span className="text-xl font-bold">{value ?? 'N/A'}</span>
      </div>
    </div>
  )

  const formatTipo = (tipo: ('tipo-0' | 'tipo-1' | 'tipo-2')[] | null | undefined) => {
    if (!tipo || tipo.length === 0) return 'Tipo non disponibile'
    return tipo.join(', ')
  }

  return (
    <div className="grid grid-cols-2 gap-px bg-white">
      <div className="bg-black text-white border-white p-2 border-b-4 col-span-2">
        <div className="flex h-full justify-center">
          <span className="text-xl font-bold">{formatTipo(tipo)}</span>
        </div>
      </div>
      {renderDetail('lunghezza', lunghezza ? `${lunghezza} km` : 'Non disponibile')}
      {renderDetail('durata', tempo ? `${tempo} ore` : 'Non disponibile')}
      {renderDetail('dislivello', dislivello ? `${dislivello} mt` : 'Non disponibile')}
      {renderDetail('difficoltà', difficolta ?? 'Non disponibile')}
    </div>
  )
}

export default ItinerarioDetailsCard
