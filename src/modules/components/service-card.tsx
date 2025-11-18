import { Itinerari, Luoghi } from '@/payload-types'

import { Button } from './button'
import { RichText } from './richtext'
import { cn } from './shadcn/lib/utils'

//

export type Service =
	| NonNullable<Luoghi['services']>[number]
	| NonNullable<Itinerari['services']>[number]

type Props = {
	service: Service
	className?: string
}

export function ServiceCard(props: Props) {
	const { service, className } = props
	const classes = cn('bg-white rounded-lg p-4 space-y-2', className)

	return (
		<div className={classes}>
			<h3 className="text-lg font-semibold">{service.name}</h3>
			{service.description && <RichText data={service.description} className="prose-sm" />}
			{service.url && (
				<Button href={service.url} target="_blank">
					Vai al service
				</Button>
			)}
		</div>
	)
}
