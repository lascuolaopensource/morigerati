export function cleanPath(path: string) {
	const SRC = 'src'
	return SRC + path.split(SRC).at(-1)
}
