import { Field, Tab } from 'payload'

import { arrayRowLabel } from './components'
import * as F from './fields'

//

export function descrizione(): Tab {
	return {
		label: 'Descrizione',
		fields: [
			F.richText({
				label: 'Descrizione',
				name: 'description',
				required: true,
			}),
		],
	}
}

export function servizi(): Tab {
	return {
		label: 'Servizi',
		fields: [
			{
				name: 'services',
				type: 'array',
				admin: {
					components: {
						RowLabel: arrayRowLabel(F.name.name),
					},
				},
				fields: [
					F.name,
					F.plainRichText({
						name: 'description',
						label: 'Descrizione',
						required: true,
					}),
					F.url({
						label: 'URL (opzionale)',
					}),
				],
			},
		],
	}
}

export function multimedia(fields: Field[] = []): Tab {
	return {
		label: 'Multimedia',
		fields: [F.media({ name: 'gallery', label: 'Galleria', hasMany: true }), ...fields],
	}
}

// export function tabContenuto(props: { video?: boolean } = {}): Tab {
// 	const fields: Field[] = [
// 		header('Immagini e media'),

// 		divider(),
// 		header('Contenuti testuali'),
// 		{
// 			name: 'text_content',
// 			type: 'richText',
// 			label: 'Contenuto testuale',
// 			localized: true,
// 			required: true,
// 			editor: lexicalEditor(),
// 		},
// 	]

// 	if (props.video) {
// 		fields.splice(2, 0)
// 	}

// 	return {
// 		label: 'Contenuto',
// 		fields: fields,
// 	}
// }
