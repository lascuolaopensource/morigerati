import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { getTranslations } from 'next-intl/server'

import { getSectionDisplayData, MainCollection } from '@/modules/brand'
import { Button } from '@/modules/components/button'
import { PixelBorder } from '@/modules/components/pixel-border'
import { RichText } from '@/modules/components/richtext'
import { cn } from '@/modules/components/shadcn/lib/utils'

//

interface Props {
	title: string
	text: SerializedEditorState
	section: MainCollection
	alignment?: 'left' | 'right'
	children?: React.ReactNode
}

export async function HomeSection(props: Props) {
	const { section, alignment = 'left', title, text, children } = props

	const { invertedClassName, className } = getSectionDisplayData(section)

	const sectionClasses = cn(
		'flex flex-col md:flex-row gap-8 md:gap-0 items-center',
		'max-w-screen-xl mx-auto py-12 md:py-18 ',
		{
			'md:flex-row': alignment === 'left',
			'md:flex-row-reverse': alignment === 'right',
		},
	)

	const textClasses = cn(
		invertedClassName,
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
				<div className={cn('grow basis-1', textClasses)}>
					<h2 className="text-2xl font-medium">{title}</h2>
					<RichText data={text} disableProse={true} className="text-black" />
					<ViewAllButton collection={section} />
				</div>

				{children && <div className="grow px-4 md:px-8 basis-1">{children}</div>}
			</section>
		</>
	)
}

//

type ViewAllButtonProps = {
	collection: MainCollection
}

async function ViewAllButton(props: ViewAllButtonProps) {
	const { collection } = props
	const t = await getTranslations('homeButtons')

	// @ts-expect-error - Slight type mismatch
	const buttonText = t(props.collection)

	return (
		<Button color={collection} href={`/${collection}`}>
			{buttonText}
		</Button>
	)
}
