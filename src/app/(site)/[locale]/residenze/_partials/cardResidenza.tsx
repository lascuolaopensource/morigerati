import { Residenze } from '@/payload-types'
import { getMedia } from '@/modules/utils'
import { ImageWithFallback } from '@/modules/utils/imageWithFallback'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { format } from 'date-fns'

type Props = {
  residenza: Residenze
  archive?: boolean
}

export default function CardResidenza({ residenza, archive = false }: Props) {
  const copertina = getMedia(residenza.copertina)?.sizes?.medium?.url

  const dataInizio = residenza.data_inizio ? format(residenza.data_inizio, 'dd/MM/yyyy') : undefined
  const dataFine = residenza.data_fine ? format(residenza.data_fine, 'dd/MM/yyyy') : undefined
  const hasMultipleDates = dataInizio && dataFine && dataInizio !== dataFine

  return (
    <a
      href={`/residenze/${residenza.slug}`}
      className="flex flex-col sm:flex-row items-center bg-residenzeColor p-3 w-full rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300 gap-4"
    >
      <ImageWithFallback
        src={copertina}
        alt={`Immagine di copertina`}
        fill
        className="w-full h-[200px] sm:size-[120px] shrink-0"
        priority
      />

      <div className=" space-y-1">
        <p className="flex gap-1 text-lg text-black">
          {!archive && (
            <>
              {hasMultipleDates && (
                <>
                  <span>Dal</span>
                  <span className="font-bold">{dataInizio}</span>
                  <span>al</span>
                  <span className="font-bold">{dataFine}</span>
                </>
              )}
              {!hasMultipleDates && (
                <>
                  <span>Il</span>
                  <span className="font-bold">{dataInizio}</span>
                </>
              )}
            </>
          )}
        </p>

        <p className="text-2xl font-semibold text-white">{residenza.nome}</p>
        {residenza.abstract && (
          <RichText className="max-w-prose sm:text-balance" data={residenza.abstract} />
        )}
      </div>
    </a>
  )
}
