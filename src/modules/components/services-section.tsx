import { getTranslations } from 'next-intl/server'

import { MainCollection } from '../brand'
import { InfoSection } from './info-section'
import { ServiceCard, type Service } from './service-card'
import { cn } from './shadcn/lib/utils'

//

type Props = {
	services?: Service[] | null | undefined
	collection: MainCollection
}

export async function ServicesSection(props: Props) {
	const { services, collection } = props
	const t = await getTranslations('common')

	const classes = cn({
		'bg-luoghi/30': collection === 'luoghi',
		'bg-itinerari/30': collection === 'itinerari',
	})

	if (!services || services.length === 0) return null

	return (
		<InfoSection collection={collection} title={t('services')}>
			{services.map((service) => (
				<ServiceCard key={service.id} service={service} className={classes} />
			))}
		</InfoSection>
	)
}
