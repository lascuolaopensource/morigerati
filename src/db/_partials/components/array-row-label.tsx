'use client'

import { RowLabel, useRowLabel } from '@payloadcms/ui'

type Props = {
	fieldToUse: string
}

export default function ArrayRowLabel({ fieldToUse }: Props) {
	const { data, path } = useRowLabel<{ [key: string]: unknown }>()

	const value = data[fieldToUse]
	if (typeof value === 'string') return <div>{value}</div>
	else return <RowLabel path={path} />
}
