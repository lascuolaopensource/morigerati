import {
	BoldFeature,
	InlineToolbarFeature,
	ItalicFeature,
	lexicalEditor,
	LinkFeature,
} from '@payloadcms/richtext-lexical'
import {
	ArrayField,
	DateField,
	JoinField,
	TextFieldSingleValidation,
	type CollectionSlug,
	type Field,
	type GroupField,
	type RichTextField,
	type RowField,
	type TextField,
	type UploadField,
} from 'payload'
import z from 'zod/v4'

import { capitalizeFirstLetter } from '@/modules/utils'
import { Itinerari, Luoghi, Media, Persone, User } from '@/payload-types'

import { arrayRowLabel, divider, header } from './ui'
export { divider, header }

// Upload

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

// Rich Text

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

// Pre-baked

export const name: TextField = {
	type: 'text',
	label: 'Nome',
	name: 'name',
	required: true,
	localized: true,
}

export function row(fields: Field[]): RowField {
	return {
		type: 'row',
		fields,
	}
}

const urlValidator: TextFieldSingleValidation = (v) => {
	const parse = z.url().safeParse(v)
	if (parse.success) return true
	return parse.error.message
}

export function url(props: Omit<TextField, 'type'>): TextField {
	// @ts-expect-error - Slight type mismatch
	return {
		type: 'text',
		hasMany: false,
		...props,
		validate: urlValidator,
	}
}

export function array(props: Omit<ArrayField, 'type'> & { fieldForRowLabel: string }): ArrayField {
	return {
		type: 'array',
		admin: {
			...props.admin,
			components: {
				...props.admin?.components,
				RowLabel: arrayRowLabel({ fieldToUse: props.fieldForRowLabel }),
			},
		},
		...props,
	}
}

export function date(props: Omit<DateField, 'type'>): DateField {
	return {
		type: 'date',
		admin: {
			date: {
				displayFormat: 'dd/MM/yyyy',
			},
			...props.admin,
		},
		...props,
	}
}

export function location(): RowField {
	return row([
		{ name: 'address', label: 'Indirizzo', type: 'text' },
		{
			name: 'coordinates',
			label: 'Posizione',
			type: 'point',
			admin: {
				description: 'Serve per visualizzare la posizione sulla mappa',
			},
		},
	])
}

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
	return array({
		name: 'contatti',
		fieldForRowLabel: name.name,
		fields: [
			row([{ ...name, localized: false }, url({ name: 'url', label: 'URL' })]),
			row([
				{ name: 'email', type: 'email' },
				{ name: 'telefono', type: 'text' },
			]),
		],
	})
}

export function links(props: Omit<ArrayField, 'type' | 'fields'>): ArrayField {
	return array({
		fieldForRowLabel: name.name,
		fields: [row([name, url({ name: 'url', label: 'URL' })])],
		...props,
	})
}

export function copertina(
	props: Omit<Parameters<typeof media>[0], 'collection' | 'name'> = {},
): UploadField {
	return media({ name: 'copertina', label: 'Immagine di copertina', ...props })
}

// Join

type Collections = {
	users: User
	media: Media
	itinerari: Itinerari
	luoghi: Luoghi
	persone: Persone
}

type Collection = keyof Collections
type CollectionField<C extends Collection> = keyof Collections[C]

export function join<C extends Collection>(
	props: { collection: C; on: CollectionField<C> } & Omit<JoinField, 'collection' | 'on' | 'type'>,
): JoinField {
	const { collection, on, ...rest } = props
	return {
		...rest,
		type: 'join',
		collection,
		defaultLimit: 0,
		on: on as string,
	}
}

// // Field factory functions
// const createLocalizedField = <T extends Field>(field: T): T => ({
// 	...field,
// 	localized: true,
// })

// const createRequiredField = <T extends Field>(field: T): T => ({
// 	...field,
// 	required: true,
// })

// const createTextField = (name: string, options: Partial<TextField> = {}): TextField =>
// 	({
// 		name,
// 		type: 'text',
// 		...options,
// 	}) as TextField

// const createRichTextField = (name: string): RichTextField =>
// 	({
// 		name,
// 		type: 'richText',
// 	}) as RichTextField

// const createHomeRichTextField = (name: string): RichTextField =>
// 	({
// 		name,
// 		type: 'richText',
// 		editor: lexicalEditor({
// 			features: () => [
// 				ParagraphFeature(),
// 				BoldFeature(),
// 				ItalicFeature(),
// 				UnderlineFeature(),
// 				InlineToolbarFeature(),
// 			],
// 		}),
// 	}) as RichTextField

// const createRowField = (fields: Field[]): RowField =>
// 	({
// 		type: 'row',
// 		fields,
// 	}) as RowField

// const createArrayField = (
// 	name: string,
// 	fields: Field[],
// 	options: Partial<ArrayField> = {},
// ): ArrayField =>
// 	({
// 		name,
// 		type: 'array',
// 		fields,
// 		...options,
// 	}) as ArrayField

// type Overrides = {
// 	slugOverrides?: Partial<TextField>
// 	checkboxOverrides?: Partial<CheckboxField>
// 	localized?: boolean
// }

// type Slug = (fieldToUse?: string, overrides?: Overrides) => [TextField, CheckboxField]

// export const slugField: Slug = (fieldToUse = 'title', overrides = {}) => {
// 	const { slugOverrides, checkboxOverrides, localized = false } = overrides

// 	const checkBoxField: CheckboxField = {
// 		name: 'slugLock',
// 		type: 'checkbox',
// 		defaultValue: true,
// 		admin: {
// 			hidden: true,
// 			position: 'sidebar',
// 		},
// 		...checkboxOverrides,
// 	} as CheckboxField

// 	const slugField: TextField = {
// 		name: 'slug',
// 		type: 'text',
// 		index: true,
// 		label: 'Slug',
// 		localized,
// 		hooks: {
// 			beforeValidate: [formatSlugHook(fieldToUse)],
// 		},
// 		admin: {
// 			position: 'sidebar',
// 			...(slugOverrides?.admin || {}),
// 			components: {
// 				Field: {
// 					path: '@/db/fields/slug/SlugComponent#SlugComponent',
// 					clientProps: {
// 						fieldToUse,
// 						checkboxFieldPath: checkBoxField.name,
// 					},
// 				},
// 			},
// 		},
// 		...(slugOverrides || {}),
// 	} as TextField

// 	return [slugField, checkBoxField]
// }

// export const gap = (size: number, key: string): UIField =>
// 	createUIField(`gap-${key}`, '@/db/fields/components/gap.tsx', { size })

// export const divider = (key: string): UIField =>
// 	createUIField(`divider-${key}`, '@/db/fields/components/divider.tsx', {})

// export const nome = createRequiredField(createTextField('nome'))

// export const link = createTextField('link')

// export const testo = createLocalizedField(createRichTextField('testo'))

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
