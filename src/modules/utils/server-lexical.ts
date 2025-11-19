import config from '@payload-config'
import { convertLexicalToMarkdown, editorConfigFactory } from '@payloadcms/richtext-lexical'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import markdownToTxt from 'markdown-to-txt'

//

export async function createLexicalToTxtConverter() {
	const payloadConfig = await config
	const editorConfig = await editorConfigFactory.default({
		config: payloadConfig,
	})
	return (data: SerializedEditorState | null | undefined) => {
		if (!data) return undefined
		return markdownToTxt(
			convertLexicalToMarkdown({
				data: data,
				editorConfig: editorConfig,
			}),
		)
	}
}

type Converter = Awaited<ReturnType<typeof createLexicalToTxtConverter>>

export function createTruncatedConverter(converter: Converter, maxLength: number): Converter {
	return (data: SerializedEditorState | null | undefined) => {
		const text = converter(data)
		if (!text) return undefined
		return text.slice(0, maxLength)
	}
}
