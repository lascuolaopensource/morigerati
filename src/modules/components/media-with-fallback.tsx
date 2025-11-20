import { ClassValue } from 'clsx'
import { ImageProps } from 'next/image'

import { Media } from '@/payload-types'

import { getRelation, Optional, Relation } from '../utils'
import { ImageWithFallback } from './image-with-fallback'

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
	const src = record?.sizes?.[size]?.url ?? undefined
	const actualAlt = alt ?? record?.alt

	return (
		<ImageWithFallback
			src={src}
			alt={actualAlt}
			className={className}
			noPlaceholderPulse={noPlaceholderPulse}
			{...restProps}
		/>
	)
}
