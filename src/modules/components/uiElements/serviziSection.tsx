import { MainCollections } from '@/modules/types'
import { Servizio, CardServizio } from './cardServizio'
import { InfoSection } from './infoSection'
import { cn } from '@/modules/utils/utils'
import { useMessages } from 'next-intl'

type Props = {
  servizi?: Servizio[] | null | undefined
  collection: MainCollections
}

export function ServiziSection(props: Props) {
  const { servizi, collection } = props
  const messages = useMessages()

  const classes = cn({
    'bg-luoghiColor/30': collection === 'luoghi',
    'bg-itinerariColor/30': collection === 'itinerari',
  })

  if (!servizi || servizi.length === 0) return null

  // TODO - Improve i18n type safety
  // @ts-ignore
  const title = messages.luoghi.servizi.title

  return (
    <div className="max-w-prose space-y-2">
      <InfoSection collection={collection} title={title}>
        {servizi.map((servizio) => (
          <CardServizio key={servizio.id} servizio={servizio} className={classes} />
        ))}
      </InfoSection>
    </div>
  )
}
