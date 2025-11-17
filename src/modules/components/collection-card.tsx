import { ClassValue } from 'clsx'

import { getSectionDisplayData, MainCollection, MainCollectionRecord } from '@/modules/brand'
import { Link } from '@/modules/i18n'

import { MediaWithFallback } from './media-with-fallback'
import { cn } from './shadcn/lib/utils'

//

interface Props {
	collection: MainCollection
	record: MainCollectionRecord
	className?: ClassValue
	content?: (record: MainCollectionRecord) => React.ReactNode
}

export function CollectionCard(props: Props) {
	const { collection, record, className, content } = props

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
			{content ? content(record) : <DefaultContent record={record} />}
		</Link>
	)
}

//

function DefaultContent({ record }: { record: MainCollectionRecord }) {
	return (
		<>
			<MediaWithFallback
				media={record.copertina}
				size="small"
				className="h-200px aspect-video rounded-md"
				noPlaceholderPulse
			/>
			<p className="font-medium p-2 pb-1 pt-2">{record.name}</p>
		</>
	)
}
