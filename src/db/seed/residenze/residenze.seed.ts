import path from 'node:path'

import { getPaths } from '@/modules/utils/node'
import { getDb } from '@/modules/utils/server'

import { createMediaFromDirectory, createVideoFromDirectory } from '../utils'
import residenze from './residenze.json'

//

const { dirname } = getPaths(import.meta.url)

export async function seedResidenze() {
	const payload = await getDb()

	for (const residenza of residenze) {
		const copertina = await createMediaFromDirectory(payload, path.resolve(dirname, residenza.slug))

		const people = await createMediaFromDirectory(
			payload,
			path.resolve(dirname, residenza.slug, 'esperti'),
		)

		const gallery = await createMediaFromDirectory(
			payload,
			path.resolve(dirname, residenza.slug, 'galleria'),
		)

		const video = await createVideoFromDirectory(
			payload,
			path.resolve(dirname, residenza.slug, 'video'),
		)

		await payload.create({
			collection: 'residenze',
			data: {
				name: residenza.nome,
				slug: residenza.slug,
				start_date: residenza.data_inizio,
				end_date: residenza.data_fine,
				registration_deadline: residenza.deadline_iscrizione,
				registration_url: residenza.link_iscrizione,
				copertina: copertina.at(0)?.id,
				show_registration_button: residenza.mostra_pulsante_iscrizione,
				short_description: residenza.abstract,
				// @ts-expect-error - RTL mistake
				description: residenza.descrizione.it,
				// @ts-expect-error - RTL mistake
				program: residenza.programma.map((p) => ({
					step_name: p.programma.it,
					step_description: p.testo.it,
				})),
				// @ts-expect-error - RTL mistake
				people: residenza.esperti.map((e) => ({
					name: e.nome,
					bio: e.biografia.it,
					foto: people.find((p) => p.filename?.startsWith(e.nome))?.id,
					organizations: e.organizzazioni.map((o) => ({
						name: o.nome,
						url: o.link,
					})),
				})),
				gallery: gallery.map((g) => g.id),
				video: video.at(0)?.id,
			},
		})
	}
}
