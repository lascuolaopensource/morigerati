import { getSectionDisplayData, MainCollection } from '../brand'
import { RandomLetter } from './random-letter'
import { cn } from './shadcn/lib/utils'
import { T } from './t'

//

type Props = {
	title?: string
	description?: string
	children?: React.ReactNode
	collection?: MainCollection
	height?: number
}

export function EmptyState(props: Props) {
	const { title, description, children, collection, height = 200 } = props
	const { className } = getSectionDisplayData(collection)

	return (
		<div
			style={{ height: `${height}px` }}
			className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg"
		>
			<div className={cn('absolute -z-50 inset-0 w-full h-full opacity-10', className)}></div>

			<div className="absolute -z-40 inset-0 w-full h-full flex items-center justify-center opacity-20">
				<RandomLetter collection={collection} size={height} />
				<RandomLetter collection={collection} size={height} />
				<RandomLetter collection={collection} size={height} />
			</div>

			<div className="flex flex-col items-center gap-2">
				{title && (
					<T tag="h3" className="text-center">
						{title}
					</T>
				)}
				{description && <T>{description}</T>}
				{children}
			</div>
		</div>
	)
}
