import { ClassValue } from 'clsx'
import Image from 'next/image'

import { getSectionDisplayData, MainCollection, MainCollectionRecord } from '@/modules/brand'
import { Link } from '@/modules/i18n'

import { getMedia } from '../utils'
import { ImagePlaceholder } from './image-placeholder'
import { cn } from './shadcn/lib/utils'

//

interface Props {
	collection: MainCollection
	record: MainCollectionRecord
	className?: ClassValue
}

export function CollectionCard(props: Props) {
	const { collection, record, className } = props

	const cover = getMedia(record.copertina)
	const coverSmall = cover?.sizes?.small?.url

	const { className: themeClassName, borderClassName } = getSectionDisplayData(collection)

	return (
		<Link
			href={`/${collection}/${record.slug}`}
			className={cn(
				'flex flex-col border-[3px] h-full',
				'rounded-lg overflow-hidden duration-300 hover:scale-105 relative cursor-pointer',
				themeClassName,
				borderClassName,
				className,
			)}
		>
			<div className="relative h-[200px] aspect-video rounded-md overflow-hidden">
				<ImagePlaceholder className="absolute inset-0" />
				{coverSmall && (
					<Image
						src={coverSmall}
						alt={cover?.alt || ''}
						fill
						className="object-cover"
						priority
						unoptimized
					/>
				)}
			</div>

			<p className="font-medium p-2 pb-1 pt-2">{record.name}</p>
		</Link>
	)
}
