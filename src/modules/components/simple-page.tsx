import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import type { Media } from '@/payload-types'

import { getRandomDisplayData } from '@/modules/brand'
import { Optional, Relation } from '@/modules/utils'

import { Container } from './container'
import { Copertina } from './copertina'
import { Gallery } from './gallery'
import { PixelBorder } from './pixel-border'
import { RichText } from './richtext'

//

interface ContentPageLayoutProps {
	cover?: Optional<Relation<Media>>
	richText?: SerializedEditorState
	gallery?: Optional<Relation<Media>[]>
}

export function SimplePage(props: ContentPageLayoutProps) {
	const { cover, richText, gallery } = props

	const { className } = getRandomDisplayData()

	return (
		<>
			<Copertina copertina={cover} />

			<PixelBorder className={`w-full ${className}`} />

			{richText && (
				<Container>
					<div>
						<RichText data={richText} className="prose md:prose-lg mx-auto" />
					</div>
				</Container>
			)}

			<Gallery items={gallery} className={className} />
		</>
	)
}
