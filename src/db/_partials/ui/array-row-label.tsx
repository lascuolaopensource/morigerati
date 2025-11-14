'use client'

import { RowLabel, useRowLabel } from '@payloadcms/ui'

//

export type ArrayRowLabelProps = {
	fieldToUse: string
}

export default function ArrayRowLabel({ fieldToUse }: ArrayRowLabelProps) {
	const { data, path } = useRowLabel<{ [key: string]: unknown }>()

	const value = data[fieldToUse]
	if (typeof value === 'string' && Boolean(value.trim())) return <div>{value}</div>
	else return <RowLabel path={path} />
}
