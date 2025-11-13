import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { getSectionDisplayData, Section } from '@/modules/brand'
import { PixelBorder } from '@/modules/components/pixel-border'
import { RichText } from '@/modules/components/richtext'
import { cn } from '@/modules/components/shadcn/lib/utils'

//

interface Props {
	title: string
	text: SerializedEditorState
	section: Section
	alignment?: 'left' | 'right'
	children?: React.ReactNode
}

export async function HomeSection(props: Props) {
	const { section, alignment = 'left', title, text, children } = props

	const { invertedClassName, className } = getSectionDisplayData(section)

	// const buttonText = messages.homeButtons[collection]

	const sectionClasses = cn(
		'flex flex-col md:flex-row gap-8 md:gap-0 items-center',
		'max-w-screen-xl mx-auto py-12 md:py-18 ',
		{
			'md:flex-row': alignment === 'left',
			'md:flex-row-reverse': alignment === 'right',
		},
	)

	const textClasses = cn(
		{
			'text-left items-start': alignment === 'left',
			'text-right items-end': alignment === 'right',
		},
		'flex flex-col gap-4 max-w-screen-xl mx-auto px-4 md:px-8',
	)

	return (
		<>
			<PixelBorder className={className} />

			<section className={sectionClasses}>
				<div className={cn(invertedClassName, textClasses)}>
					<h2 className="text-2xl font-medium">{title}</h2>
					<RichText data={text} disableProse={true} className="text-black" />
					{/* <ViewAllButton collection={collection} buttonColor={bgColor}>
					{buttonText}
				</ViewAllButton> */}
				</div>

				{children && <div className="grow px-4 md:px-8">{children}</div>}
			</section>
		</>
	)
}

// //

// function ViewAllButton(props: {
// 	collection: MainCollections
// 	buttonColor: string
// 	children: React.ReactNode
// }) {
// 	return (
// 		<Link
// 			href={`/${props.collection}`}
// 			className={`${props.buttonColor} group flex items-center gap-2 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 ease-in-out hover:gap-3`}
// 		>
// 			<span>{props.children}</span>
// 			<ArrowRight className="w-4 h-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
// 		</Link>
// 	)
// }

// // Filter function to get only future residenze (not yet ended)
// const filterFutureResidenze = (residenze: Residenze[]): Residenze[] => {
// 	const now = new Date()
// 	return residenze.filter((residenza) => {
// 		// Use end date if available, otherwise use start date
// 		const comparisonDate = residenza.data_fine
// 			? new Date(residenza.data_fine)
// 			: residenza.data_inizio
// 				? new Date(residenza.data_inizio)
// 				: null

// 		// If no date is available, keep it
// 		if (!comparisonDate) return true

// 		// Only keep residenze that end in the future
// 		return comparisonDate >= now
// 	})
// }
