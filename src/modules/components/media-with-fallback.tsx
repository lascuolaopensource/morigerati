import { ClassValue } from 'clsx'
import Image, { ImageProps } from 'next/image'

import { Media } from '@/payload-types'

import { getRelation, Optional, Relation } from '../utils'
import { ImagePlaceholder } from './image-placeholder'
import { cn } from './shadcn/lib/utils'

//

type MediaSize = keyof NonNullable<Media['sizes']>

type Props = Omit<ImageProps, 'src' | 'alt'> & {
	media: Optional<Relation<Media>>
	className?: ClassValue
	noPlaceholderPulse?: boolean
	size?: MediaSize
	alt?: string
}

export function MediaWithFallback(props: Props) {
	const { className, noPlaceholderPulse, media, size = 'medium', alt, ...restProps } = props

	const record = getRelation(media)
	const src = record?.sizes?.[size]?.url
	const actualAlt = alt ?? record?.alt

	return (
		<div className={cn('relative overflow-hidden', className)}>
			<ImagePlaceholder noPulse={noPlaceholderPulse} />
			{src && (
				<Image src={src} alt={actualAlt ?? ''} fill {...restProps} className="object-cover" />
			)}
		</div>
	)
}
