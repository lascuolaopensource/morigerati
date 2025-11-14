import type { Payload } from 'payload'

import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'

import { Media } from '@/payload-types'

//

/**
 * Reads all files from a directory and creates media entries for each file
 * @param payload - The Payload instance
 * @param directoryPath - The path to the directory containing the files
 * @returns An array of created Media objects
 */
export async function createMediaFromDirectory(
	payload: Payload,
	directoryPath: string,
): Promise<Media[]> {
	const files = await readdir(directoryPath)
	const gallery: Media[] = []

	for (const file of files) {
		const filePath = path.resolve(directoryPath, file)
		const fileStat = await stat(filePath)

		// Only process files, not directories
		if (fileStat.isFile()) {
			const media = await payload.create({
				collection: 'media',
				data: {
					alt: path.parse(file).name,
				},
				filePath,
			})
			gallery.push(media)
		}
	}

	return gallery
}
