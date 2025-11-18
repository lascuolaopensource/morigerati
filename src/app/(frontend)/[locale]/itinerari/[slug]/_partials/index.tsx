import { getTranslations } from 'next-intl/server'

import { DetailCard } from '@/modules/components/detail-card'
import { Itinerari } from '@/payload-types'

//

type Props = {
	itinerario: Itinerari
}

export async function ItinerarioDetailCards(props: Props) {
	const { itinerario } = props
	const t = await getTranslations('itineraries')

	const difficulty = itinerario.difficulty
	const type = itinerario.type

	return (
		<div className="grid gap-2">
			<DetailCard label={t('type.label')} value={type ? t(`type.${type}`) : null} />
			<div className="grid grid-cols-2 gap-2 w-full">
				<DetailCard label={t('length')} value={itinerario.length} />
				<DetailCard label={t('duration')} value={itinerario.duration} />
				<DetailCard label={t('elevation')} value={itinerario.elevation} />
				<DetailCard
					label={t('difficulty.label')}
					value={difficulty ? t(`difficulty.${difficulty}`) : null}
				/>
			</div>
		</div>
	)
}
