import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { ClassValue } from 'clsx'

import { MainCollection } from '../brand'
import { RichText } from './richtext'
import { SectionTitle } from './section-title'
import { cn } from './shadcn/lib/utils'

//

type Props = {
	children?: React.ReactNode
	title: string
	text?: SerializedEditorState
	className?: ClassValue
	collection: MainCollection
}

export function InfoSection(props: Props) {
	const { children, title, text, className, collection } = props

	return (
		<div className={cn('space-y-4', className)}>
			<SectionTitle color={collection}>{title}</SectionTitle>

			{text && <RichText data={text} className="prose-sm" />}

			{children}
		</div>
	)
}
