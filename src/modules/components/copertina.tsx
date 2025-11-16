import { cn } from '$/lib/utils'
import { ClassValue } from 'clsx'
import Image from 'next/image'

import type { Media } from '@/payload-types'

import { getMedia, Optional, Relation } from '../utils'

//

interface Props {
	copertina: Optional<Relation<Media>>
	className?: ClassValue
	title?: string
	overlay?: boolean
	children?: React.ReactNode
}

export function Copertina(props: Props) {
	const { className, title, overlay = false, children } = props

	const copertina = getMedia(props.copertina)
	if (!copertina) return null

	if (copertina.mimeType?.startsWith('video')) {
		return null
	}

	return (
		<div className="relative">
			<div className={cn('relative h-[70vh] max-h-[800px]', className)}>
				<Image
					src={copertina.url ?? ''}
					alt={copertina.alt}
					unoptimized={true}
					priority={true}
					fill
					className="object-cover"
				/>
			</div>

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
