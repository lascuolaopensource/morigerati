import { nanoid } from 'nanoid'
import { RowLabelComponent, UIField } from 'payload'

import { getPaths } from '@/modules/utils/server'

import type { ArrayRowLabelProps } from './array-row-label'
import type { HeaderProps } from './header'

import { cleanPath } from './utils'

//

const { dirname } = getPaths(import.meta.url)

//

export function arrayRowLabel(props: ArrayRowLabelProps): RowLabelComponent {
	return {
		path: cleanPath(dirname, 'array-row-label.tsx'),
		clientProps: props,
	}
}

export function divider(): UIField {
	return {
		type: 'ui',
		name: 'divider-' + nanoid(5),
		admin: {
			components: {
				Field: {
					path: cleanPath(dirname, 'divider.tsx'),
					clientProps: {},
				},
			},
		},
	}
}

export function header(text: string): UIField {
	return {
		type: 'ui',
		name: 'header-' + nanoid(5),
		admin: {
			components: {
				Field: {
					path: cleanPath(dirname, 'header.tsx'),
					clientProps: { content: text } satisfies HeaderProps,
				},
			},
		},
	}
}
