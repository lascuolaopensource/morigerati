import { ArrowRight } from 'lucide-react'

import { CollectionCard } from '@/modules/components/collection-card'
import { MediaWithFallback } from '@/modules/components/media-with-fallback'
import { formatDate } from '@/modules/utils'
import { Residenze } from '@/payload-types'

//

type Props = {
	residenza: Residenze
	archive?: boolean
}

export default function CardResidenza(props: Props) {
	const { residenza } = props

	const startDate = formatDate(residenza.start_date)
	const endDate = residenza.end_date ? formatDate(residenza.end_date) : undefined
	const hasDateRange = startDate && endDate && startDate !== endDate

	return (
		<CollectionCard
			collection="residenze"
			record={residenza}
			content={(_) => (
				<div className="flex flex-col sm:flex-row items-center gap-4 p-2">
					<MediaWithFallback
						media={residenza.copertina}
						className="w-full h-[200px] sm:size-[120px] shrink-0 rounded-md"
						size="medium"
						noPlaceholderPulse
					/>

					<div>
						<p className="flex items-center gap-1 text-black mb-1">
							{hasDateRange ? (
								<>
									<span className="font-medium">{startDate}</span>
									<ArrowRight size={16} className="-translate-y-px" />
									<span className="font-medium">{endDate}</span>
								</>
							) : (
								<>
									<span className="font-medium">{startDate}</span>
								</>
							)}
						</p>

						<p className="text-2xl font-semibold text-white mb-2">{residenza.name}</p>
						<p className="max-w-prose text-sm sm:text-balance">{residenza.short_description}</p>
					</div>
				</div>
			)}
		/>
	)
}
