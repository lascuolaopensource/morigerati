import path from 'node:path'

import { getPaths } from '@/modules/utils/node'
import { getDb } from '@/modules/utils/server'
import { Itinerari } from '@/payload-types'

import {
	createMediaFromDirectory,
	createTracciatoFromDirectory,
	createVideoFromDirectory,
} from '../utils'
import itinerari from './itinerari.json'

//

const { dirname } = getPaths(import.meta.url)

export async function seedItinerari() {
	const payload = await getDb()

	for (const itinerario of itinerari) {
		const copertina = await createMediaFromDirectory(
			payload,
			path.resolve(dirname, itinerario.slug),
			['.gpx'],
		)

		const galleria = await createMediaFromDirectory(
			payload,
			path.resolve(dirname, itinerario.slug, 'galleria'),
		)

		const video = await createVideoFromDirectory(
			payload,
			path.resolve(dirname, itinerario.slug, 'video'),
		)

		const tracciato = await createTracciatoFromDirectory(
			payload,
			path.resolve(dirname, itinerario.slug),
		)

		const data: Itinerari = {
			name: itinerario.nome,
			slug: itinerario.slug,
			// @ts-expect-error - Slight type mismatch
			description: itinerario.testo.it,
			copertina: copertina.at(0)?.id,
			gallery: galleria.map((g) => g.id),
			video: video.at(0)?.id,
			gpx_track: tracciato.at(0)?.id,
			length: itinerario.lunghezza.toString(),
			duration: itinerario.tempo.toString(),
			elevation: itinerario.dislivello,
			type: convertTipo(itinerario.tipo),
			difficulty: convertDifficolta(itinerario.difficolta),
			services: itinerario.servizi.map((s, index) => ({
				name: index.toString().padStart(2, '0'),
				description: {
					root: {
						type: 'text',
						children: [{ type: 'text', text: s.nome.it, version: 1 }],
						direction: 'ltr',
						format: 'left',
						indent: 0,
						version: 1,
					},
				},
			})),
		}

		await payload.create({
			collection: 'itinerari',
			data,
		})
	}
}

function convertTipo(tipo: string | undefined): 'loop' | 'out_and_back' {
	if (!tipo) throw new Error('Tipo mancante')
	switch (tipo) {
		case 'Itinerario ad anello':
			return 'loop'
		case 'Andata e ritorno':
			return 'out_and_back'
		default:
			throw new Error(`Tipo ${tipo} non valido`)
	}
}

function convertDifficolta(
	difficolta: string | undefined,
): 'touristic' | 'hiking' | 'expert_hiking' {
	if (!difficolta) throw new Error('Difficolta mancante')
	switch (difficolta) {
		case 'T - Turistico':
			return 'touristic'
		case 'E - Escursionistico':
			return 'hiking'
		case 'EE - Escursionisti Esperti':
			return 'expert_hiking'
		default:
			throw new Error(`Difficolta ${difficolta} non valida`)
	}
}
