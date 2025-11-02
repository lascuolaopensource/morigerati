import type { UIField } from 'payload'
import type { JSXElementConstructor } from 'react'

import type { importMap } from '@/app/(payload)/admin/importMap'

//

type ComponentPath = keyof typeof importMap
type Component<P extends ComponentPath> = (typeof importMap)[P]
type ClientProps<P extends ComponentPath> =
	Component<P> extends JSXElementConstructor<infer Props> ? Props : undefined

export function createUIField<P extends ComponentPath>(props: {
	name: string
	componentPath: P
	clientProps: ClientProps<P>
}): UIField {
	return {
		name: props.name,
		type: 'ui',
		admin: {
			components: {
				Field: {
					path: props.componentPath,
					// @ts-expect-error - clientProps is not typed
					clientProps: props.clientProps,
				},
			},
		},
	}
}
