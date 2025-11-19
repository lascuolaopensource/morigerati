import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import { cn } from '$/lib/utils'
// import { jsxConverter } from '@/components/RichText/converters'

//

type Props = {
	data: SerializedEditorState
	disableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export function RichText(props: Props) {
	const { className, disableProse = false, ...rest } = props

	return (
		<RichTextConverter
			disableTextAlign
			{...rest}
			className={cn(!disableProse && 'prose text-primary prose-strong:text-primary', className)}
			// converters={jsxConverter}
		/>
	)
}
