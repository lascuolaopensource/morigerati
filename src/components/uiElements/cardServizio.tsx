import { cn } from '@/lib/utils'
import { Luoghi, Itinerari } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

export type Servizio =
  | NonNullable<Luoghi['servizi']>[number]
  | NonNullable<Itinerari['servizi']>[number]

type Props = {
  servizio: Servizio
  className?: string
}

export function CardServizio({ servizio, className }: Props) {
  const classes = cn('bg-white rounded-lg p-4 space-y-2', className)

  return (
    <div className={classes}>
      <h3 className="text-lg font-semibold">{servizio.nome}</h3>
      {servizio.testo && <RichText data={servizio.testo} className="prose-sm" />}
    </div>
  )
}
