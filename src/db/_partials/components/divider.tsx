import { nanoid } from 'nanoid'
import { UIField } from 'payload'

import { cleanPath } from './utils'

//

export default function Divider() {
	return (
		<div
			style={{
				padding: '15px 0 25px 0',
			}}
		>
			<hr style={{ borderColor: 'var(--theme-elevation-150)' }} />
		</div>
	)
}

//

export function divider(): UIField {
	return {
		name: 'divider-' + nanoid(5),
		type: 'ui',
		admin: {
			components: {
				Field: {
					path: cleanPath(import.meta.url),
					serverProps: {},
				},
			},
		},
	}
}
