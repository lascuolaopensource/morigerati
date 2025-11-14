import type { Field, Tab } from 'payload'

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

export function multimedia(fields: Field[] = []): Tab {
	return {
		label: 'Multimedia',
		fields: [F.media({ name: 'gallery', label: 'Galleria', hasMany: true }), ...fields],
	}
}

export function servizi(): Tab {
	return {
		label: 'Servizi',
		fields: [
			{
				name: 'services',
				label: 'Servizi',
				type: 'array',
				admin: {
					components: {
						RowLabel: {
							path: 'src/db/_partials/components/array-row-label.tsx',
							clientProps: { fieldToUse: F.name.name },
						},
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
