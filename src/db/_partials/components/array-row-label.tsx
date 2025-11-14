'use client'

import { RowLabel, useRowLabel } from '@payloadcms/ui'
import { RowLabelComponent } from 'payload'

import { cleanPath } from './utils'

//

type Props = {
	fieldToUse: string
}

export default function ArrayRowLabel({ fieldToUse }: Props) {
	const { data, path } = useRowLabel<{ [key: string]: unknown }>()

	const value = data[fieldToUse]
	if (typeof value === 'string') return <div>{value}</div>
	else return <RowLabel path={path} />
}

//

export function arrayRowLabel(fieldToUse: string): RowLabelComponent {
	const props: Props = {
		fieldToUse,
	}
	return {
		path: cleanPath(import.meta.url),
		clientProps: props,
	}
}
