import { cn } from '$/lib/utils'
import { ClassValue } from 'clsx'

import type { Media } from '@/payload-types'

import { getSectionDisplayData, MainCollection } from '../brand'
import { Optional, Relation } from '../utils'
import { MediaWithFallback } from './media-with-fallback'

//

interface Props {
	copertina: Optional<Relation<Media>>
	className?: ClassValue
	title?: string
	overlay?: boolean
	children?: React.ReactNode
	collection?: MainCollection
}

export function Copertina(props: Props) {
	const { copertina, className, title, overlay = false, children, collection } = props

	let collectionClass = ''
	if (collection) {
		collectionClass = getSectionDisplayData(collection).className
	}

	return (
		<div className={cn('relative', collectionClass)}>
			<MediaWithFallback
				media={copertina}
				className={cn('relative h-[70vh] max-h-[800px]', className)}
				noPlaceholderPulse
			/>

			{overlay && <div className="absolute inset-0 bg-black opacity-30" />}

			{title && (
				<div className="absolute inset-0 flex items-center justify-center">
					<p className="text-center font-bold text-white text-3xl z-10 max-w-xl px-4">{title}</p>
				</div>
			)}

			{children}
		</div>
	)
}
