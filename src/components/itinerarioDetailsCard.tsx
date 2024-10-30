import { type Itinerari } from '@/payload-types'

import { GiPathDistance } from 'react-icons/gi'
import { LuTimer } from 'react-icons/lu'
import { SiLevelsdotfyi } from 'react-icons/si'
import { IoSpeedometerOutline } from 'react-icons/io5'

type ItinerarioDetailsProps = Pick<
  Itinerari,
  'lunghezza' | 'tempo' | 'dislivello' | 'difficolta' | 'tipo'
>

interface DetailSectionProps {
  label: string
  value: string | number | null | undefined
  icon?: string
}
interface IconsProps {
  icon?: string
}
const Icons = ({ icon }: IconsProps) => {
  if (icon == 'distance') {
    return <GiPathDistance size={30} />
  }
  if (icon == 'time') {
    return <LuTimer size={30} />
  }
  if (icon == 'dislivello') {
    return <SiLevelsdotfyi size={30} />
  }
  if (icon == 'difficolta') {
    return <IoSpeedometerOutline size={30} />
  }
}

const DetailSection = ({ label, value, icon }: DetailSectionProps) => (
  <div className="h-24 border-2 rounded-xl border-itinerarioColorScuro bg-itinerarioColor p-2 text-black">
    <div className="flex h-full flex-col justify-between">
      <div>
        <Icons icon={icon} />
      </div>
      <div className="h-6" />

      <span className=" text-sm">{label}</span>
      <span className=" text-sm font-bold ">{value ?? 'Non disponibile'}</span>
    </div>
  </div>
)

const TipoSection = ({ tipo }: { tipo: ItinerarioDetailsProps['tipo'] }) => {
  const formatTipo = (tipoValue: typeof tipo) => {
    if (!tipoValue?.length) return 'Tipo non disponibile'
    return tipoValue.join(', ')
  }

  return (
    <div className="col-span-2 border-2 rounded-xl border-itinerarioColorScuro bg-itinerarioColor p-2 text-black">
      <div className="flex h-full justify-center">
        <span className="text-xl font-bold">{formatTipo(tipo)}</span>
      </div>
    </div>
  )
}

export default function ItinerarioDetailsCard({
  lunghezza,
  tempo,
  dislivello,
  difficolta,
  tipo,
}: ItinerarioDetailsProps) {
  const formatValue = (value: string | number | null | undefined, unit?: string) => {
    if (!value) return 'Non disponibile'
    return unit ? `${value} ${unit}` : value
  }

  return (
    <div className="pt-5 grid grid-cols-2 gap-2 bg-white">
      <TipoSection tipo={tipo} />
      <DetailSection label="lunghezza" value={formatValue(lunghezza, 'km')} icon="distance" />
      <DetailSection label="durata" value={formatValue(tempo, 'ore')} icon="time" />
      <DetailSection label="dislivello" value={formatValue(dislivello, 'mt')} icon="dislivello" />
      <DetailSection label="difficoltà" value={formatValue(difficolta)} icon="difficolta" />
    </div>
  )
}
