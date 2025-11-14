import {
	BoldFeature,
	InlineToolbarFeature,
	ItalicFeature,
	lexicalEditor,
	LinkFeature,
} from '@payloadcms/richtext-lexical'
import {
	ArrayField,
	type CollectionSlug,
	type Field,
	type GroupField,
	type RichTextField,
	type RowField,
	type TextField,
	type UploadField,
} from 'payload'

import { capitalizeFirstLetter } from '@/modules/utils'

import { arrayRowLabel, divider, header } from './components'
export { divider, header }

// Main

export const name: TextField = {
	type: 'text',
	label: 'Nome',
	name: 'name',
	required: true,
	localized: true,
}

// Uploads

export function upload<C extends CollectionSlug>(
	props: { collection: C } & Omit<UploadField, 'relationTo' | 'type'>,
): UploadField {
	const { collection, ...rest } = props
	// @ts-expect-error - Slight type mismatch
	return {
		...rest,
		type: 'upload',
		relationTo: collection,
	}
}

export function media(props: Omit<Parameters<typeof upload>[0], 'collection'>): UploadField {
	return upload({ collection: 'media', ...props })
}

export function video(props: Omit<Parameters<typeof upload>[0], 'collection'>): UploadField {
	return upload({ collection: 'video', ...props })
}

// Misc

export function row(fields: Field[]): RowField {
	return {
		type: 'row',
		fields,
	}
}

export function url(props: Omit<TextField, 'type' | 'name'> = {}): TextField {
	// @ts-expect-error - Slight type mismatch
	return {
		type: 'text',
		label: 'URL',
		...props,
		name: 'url',
	}
}

// Rich text

export function richText(
	props: Omit<RichTextField, 'type' | 'editor' | 'localized'>,
): RichTextField {
	return {
		type: 'richText',
		editor: lexicalEditor(),
		localized: true,
		...props,
	}
}

export function plainRichText(
	props: Omit<RichTextField, 'type' | 'editor' | 'localized'>,
): RichTextField {
	return {
		localized: true,
		editor: lexicalEditor({
			features: () => [BoldFeature(), ItalicFeature(), LinkFeature(), InlineToolbarFeature()],
		}),
		...props,
		type: 'richText',
	}
}

// Groups

export function titleAndDescription(name: string, label?: string): GroupField {
	return {
		name,
		type: 'group',
		label: label ?? capitalizeFirstLetter(name),
		fields: [
			{
				name: 'title',
				type: 'text',
				label: 'Titolo',
				localized: true,
				required: true,
			},
			plainRichText({
				name: 'description',
				label: 'Descrizione',
				required: true,
			}),
		],
	}
}

export function contatti(): ArrayField {
	return {
		name: 'contatti',
		type: 'array',
		admin: {
			components: {
				RowLabel: arrayRowLabel(name.name),
			},
		},
		fields: [
			row([name, url()]),
			row([
				{ name: 'email', type: 'email' },
				{ name: 'telefono', type: 'text' },
			]),
		],
	}
}

// export const posizione: PointField = {
// 	name: 'posizione',
// 	type: 'point',
// }

// export const linkConNome: RowField = createRowField([
// 	createRequiredField(createTextField('nome')),
// 	createRequiredField(link),
// ])

// export const programmaArray: ArrayField = createArrayField(
// 	'programma',
// 	[
// 		createTextField('programma', { label: 'giorno / momento', localized: true }),
// 		{
// 			name: 'testo',
// 			type: 'richText',
// 			label: 'testo',
// 			localized: true,
// 			editor: lexicalEditor({
// 				features: () => [
// 					ParagraphFeature(),
// 					BoldFeature(),
// 					ItalicFeature(),
// 					UnderlineFeature(),
// 					LinkFeature(),
// 					OrderedListFeature(),
// 					UnorderedListFeature(),
// 				],
// 			}),
// 		},
// 	],
// 	{
// 		label: 'Programma',
// 	},
// )

// export const contatti: ArrayField = createArrayField(
// 	'contatti',
// 	[
// 		createRowField([nome, link]),
// 		createRowField([{ name: 'email', type: 'email' } as EmailField, createTextField('telefono')]),
// 	],
// 	{},
// )

// export const media: RelationshipField = {
// 	name: 'copertina',
// 	label: 'Copertina',
// 	type: 'relationship',
// 	relationTo: 'media',
// }

// export const tracciati: RelationshipField = {
// 	name: 'tracciato',
// 	label: 'tracciato',
// 	type: 'relationship',
// 	relationTo: 'tracciati',
// }

// export const galleria: RelationshipField = {
// 	name: 'galleria',
// 	label: 'Galleria',
// 	type: 'relationship',
// 	hasMany: true,
// 	relationTo: 'media',
// }

// export const servizi: ArrayField = createArrayField('servizi', [
// 	{
// 		name: 'nome',
// 		type: 'text',
// 		label: 'Nome',
// 		localized: true,
// 	},
// 	link,
// 	{
// 		name: 'testo',
// 		type: 'richText',
// 		label: 'testo',
// 		localized: true,
// 		editor: lexicalEditor({
// 			features: () => [ParagraphFeature()],
// 		}),
// 	},
// ])

// const baseContentFields: Field[] = [
// 	title('Immagini e media'),
// 	media,
// 	galleria,
// 	title('Contenuti testuali'),
// 	createRequiredField(testo),
// ]

// export const contenutoFields: Field[] = baseContentFields

// const contenutoFieldsMedia: Field[] = [
// 	...baseContentFields.slice(0, 2),
// 	{
// 		name: 'Video',
// 		type: 'relationship',
// 		relationTo: 'media',
// 		required: false,
// 	},
// 	...baseContentFields.slice(2),
// ]

// export const tabContenuto: Tab = {
// 	label: 'Contenuto',
// 	fields: contenutoFields,
// }

// export const tabContenutoItinerario: Tab = {
// 	label: 'Contenuto',
// 	fields: contenutoFieldsMedia,
// }

// export function titleAndText(name: string, label?: string): GroupField {
// 	return {
// 		name,
// 		type: 'group',
// 		label: label ?? capitalizeFirstLetter(name),
// 		fields: [
// 			createRequiredField(createLocalizedField(createTextField('title', { label: 'Titolo' }))),
// 			createRequiredField(createLocalizedField(createRichTextField('testo'))),
// 		],
// 	}
// }

// const socialNetworkLink: RowField = createRowField([nome, createRequiredField(link)])

// export const socialNetworkLinks: ArrayField = createArrayField(
// 	'Link Social',
// 	[socialNetworkLink],
// 	{},
// )
