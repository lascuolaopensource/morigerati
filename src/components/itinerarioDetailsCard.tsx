import { type Itinerari } from '@/payload-types'

type ItinerarioDetailsProps = Pick<
  Itinerari,
  'lunghezza' | 'tempo' | 'dislivello' | 'difficolta' | 'tipo'
>

interface DetailSectionProps {
  label: string
  value: string | number | null | undefined
}

const DetailSection = ({ label, value }: DetailSectionProps) => (
  <div className="h-24 border-r-4 border-y-4 border-white bg-black p-2 text-white">
    <div className="flex h-full flex-col justify-between">
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
    <div className="col-span-2 border-b-4 border-white bg-black p-2 text-white">
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
    <div className="grid grid-cols-2 gap-px bg-white">
      <TipoSection tipo={tipo} />
      <DetailSection label="lunghezza" value={formatValue(lunghezza, 'km')} />
      <DetailSection label="durata" value={formatValue(tempo, 'ore')} />
      <DetailSection label="dislivello" value={formatValue(dislivello, 'mt')} />
      <DetailSection label="difficoltà" value={formatValue(difficolta)} />
    </div>
  )
}
