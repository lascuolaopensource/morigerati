import * as F from '@/db/_partials/fields'
import { lexicalEditor, ParagraphFeature } from '@payloadcms/richtext-lexical'
import type { GlobalConfig, RichTextField } from 'payload'
import { Globals } from '.'

export const Footer: GlobalConfig = {
	slug: Globals.Footer,

	access: { read: () => true },

	fields: [
		{ ...baseRichText('testo_sinistra'), label: 'Testo a sinistra' },

		{ ...baseRichText('testo_destra'), label: 'Testo a destra' },

		F.divider('divider-1'),

		F.socialNetworkLinks,
	],
}

function baseRichText(name: string): RichTextField {
	return {
		name,
		type: 'richText',
		required: true,
		localized: true,
		editor: lexicalEditor({ features: () => [ParagraphFeature()] }),
	}
}
