import path from 'node:path'

export function cleanPath(dirname: string, filename: string) {
	const SRC = 'src'
	const resolved = path.resolve(dirname, filename)
	return SRC + resolved.split(SRC).at(-1)
}
