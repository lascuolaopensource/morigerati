import type { CollectionSlug, Payload } from 'payload'

import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'

import { Media, Tracciati, Video } from '@/payload-types'

//

export async function clearCollection(payload: Payload, collection: CollectionSlug) {
	await payload.db.deleteMany({ collection: collection, where: {} })
}

/**
 * Reads all files from a directory and creates media entries for each file
 * @param payload - The Payload instance
 * @param directoryPath - The path to the directory containing the files
 * @returns An array of created Media objects
 */
export async function createMediaFromDirectory(
	payload: Payload,
	directoryPath: string,
	excludeExtensions: string[] = [],
): Promise<Media[]> {
	try {
		await stat(directoryPath)
	} catch (err: any) {
		if (err && (err.code === 'ENOENT' || err.code === 'ENOTDIR')) {
			return []
		}
		throw err
	}

	const files = await readdir(directoryPath)
	const gallery: Media[] = []

	for (const file of files) {
		const filePath = path.resolve(directoryPath, file)
		const fileStat = await stat(filePath)

		// Only process files, not directories
		if (fileStat.isFile()) {
			if (excludeExtensions.includes(path.extname(file))) continue

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

export async function createVideoFromDirectory(
	payload: Payload,
	directoryPath: string,
): Promise<Media[]> {
	try {
		await stat(directoryPath)
	} catch (err: any) {
		if (err && (err.code === 'ENOENT' || err.code === 'ENOTDIR')) {
			return []
		}
		throw err
	}

	const files = await readdir(directoryPath)
	const gallery: Video[] = []

	for (const file of files) {
		const filePath = path.resolve(directoryPath, file)
		const fileStat = await stat(filePath)

		// Only process files, not directories
		if (fileStat.isFile()) {
			const media = await payload.create({
				collection: 'video',
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

export async function createTracciatoFromDirectory(
	payload: Payload,
	directoryPath: string,
): Promise<Tracciati[]> {
	try {
		await stat(directoryPath)
	} catch (err: any) {
		if (err && (err.code === 'ENOENT' || err.code === 'ENOTDIR')) {
			return []
		}
		throw err
	}

	const files = await readdir(directoryPath)
	const tracciati: Tracciati[] = []

	for (const file of files) {
		const filePath = path.resolve(directoryPath, file)
		const fileStat = await stat(filePath)

		// Only process files, not directories
		if (fileStat.isFile()) {
			if (path.extname(file) !== '.gpx') continue
			const tracciato = await payload.create({
				collection: 'tracciati',
				data: {},
				filePath,
			})
			tracciati.push(tracciato)
		}
	}

	return tracciati
}
