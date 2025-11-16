import path from 'node:path'
import { fileURLToPath } from 'node:url'

//

export function getPaths(importUrl: string) {
	const filename = fileURLToPath(importUrl)
	const dirname = path.dirname(filename)
	return {
		dirname,
		filename,
	}
}
