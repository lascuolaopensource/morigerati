'use client'

import { useRowLabel } from '@payloadcms/ui'

//

export type ArrayRowLabelProps = {
	fieldToUse: string
}

export default function ArrayRowLabel({ fieldToUse }: ArrayRowLabelProps) {
	const { data, path, rowNumber } = useRowLabel<{ [key: string]: unknown }>()

	const number = (rowNumber ?? 0) + 1

	let label = `${number.toString().padStart(2, '0')} - ${path}`
	try {
		const value = data[fieldToUse]
		if (typeof value === 'string' && Boolean(value.trim())) {
			label = value
		}
	} catch (error) {
		console.error(error)
	}

	return <div>{label}</div>
}
