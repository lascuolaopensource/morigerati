import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import { cn } from '$/lib/utils'
// import { jsxConverter } from '@/components/RichText/converters'

type Props = {
	data: SerializedEditorState
} & React.HTMLAttributes<HTMLDivElement>

export function RichText(props: Props) {
	const { className, ...rest } = props

	return (
		<RichTextConverter
			{...rest}
			className={cn(className, 'prose text-primary prose-strong:text-primary')}
			// converters={jsxConverter}
		/>
	)
}
