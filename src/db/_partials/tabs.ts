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
		fields: [
			F.copertina(),
			F.media({ name: 'gallery', label: 'Galleria', hasMany: true }),
			...fields,
		],
	}
}

export function servizi(): Tab {
	return {
		label: 'Servizi',
		fields: [
			F.array({
				name: 'services',
				label: 'Servizi',
				fieldForRowLabel: F.name.name,
				fields: [
					F.name,
					F.plainRichText({
						name: 'description',
						label: 'Descrizione',
						required: true,
					}),
					F.url({
						name: 'url',
						label: 'URL (opzionale)',
					}),
				],
			}),
		],
	}
}
