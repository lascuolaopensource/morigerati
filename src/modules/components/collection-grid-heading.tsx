import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { MainCollection, getSectionDisplayData } from '@/modules/brand'

import { PixelBorder } from './pixel-border'
import { RichText } from './richtext'
import { T } from './t'

//

interface CollectionHeadingProps {
	collection: MainCollection
	title: string
	description: SerializedEditorState
}

export function CollectionHeading(props: CollectionHeadingProps) {
	const { collection, title, description } = props
	const { className, invertedClassName } = getSectionDisplayData(collection)

	return (
		<>
			<PixelBorder className={className} />

			<div className="flex flex-col items-center justify-center gap-4 px-4 md:px-8 pt-10 text-center max-w-screen-xl mx-auto">
				<T tag="h1" className={invertedClassName}>
					{title}
				</T>

				<RichText data={description} className="prose md:prose-lg text-balance" />
			</div>
		</>
	)
}
