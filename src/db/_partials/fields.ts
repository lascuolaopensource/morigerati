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

export function row(fields: Field[], options: Omit<RowField, 'type' | 'fields'> = {}): RowField {
	return {
		type: 'row',
		fields,
		...options,
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

export function titleAndDescription(name: string, label?: string, fields?: Field[]): GroupField {
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
			...(fields ?? []),
		],
	}
}

export function contatti(): ArrayField {
	return array({
		name: 'contacts',
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

export function links(
	props: Omit<ArrayField, 'type' | 'fields'> & { localizedName?: boolean },
): ArrayField {
	const { localizedName = name.localized, ...rest } = props
	return array({
		fieldForRowLabel: name.name,
		fields: [row([{ ...name, localized: localizedName }, url({ name: 'url', label: 'URL' })])],
		...rest,
	})
}

export function copertina(
	props: Omit<Parameters<typeof media>[0], 'collection' | 'name'> = {},
): UploadField {
	return media({ name: 'copertina', label: 'Immagine di copertina', ...props })
}

// URL

const urlValidator: TextFieldSingleValidation = (v, ctx) => {
	if (!ctx.required && !Boolean(v?.trim())) return true
	const parse = z.url().safeParse(v)
	if (parse.success) return true
	return parse.error.message
}

type BaseUrlProps = Omit<TextField, 'type' | 'hasMany' | 'maxRows' | 'minRows' | 'validate'>
type UrlProps = BaseUrlProps & { validate?: TextFieldSingleValidation }

export function url(props: UrlProps): TextField {
	const validate: TextFieldSingleValidation = (value, ctx) => {
		const res = urlValidator(value, ctx)
		if (res !== true) return res
		return props.validate?.(value, ctx) ?? true
	}
	return {
		...props,
		type: 'text',
		hasMany: false as const,
		maxRows: undefined,
		minRows: undefined,
		validate,
	}
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
