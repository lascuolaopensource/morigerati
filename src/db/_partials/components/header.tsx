import { UIField } from 'payload'

import { cleanPath } from './utils'

//

type Props = {
	content: string
}

export default function Header({ content }: Props) {
	return (
		<header className="array-field__header" style={{ marginBottom: '25px' }}>
			<div className="array-field__header-wrap">
				<div className="array-field__header-content">
					<h3 className="array-field__title">
						<span className="field-label unstyled">{content}</span>
					</h3>
				</div>
			</div>
		</header>
	)
}

//

export function header(text: string): UIField {
	const props: Props = {
		content: text,
	}
	return {
		name: 'header-' + text.toLowerCase().replace(/\s+/g, '-'),
		type: 'ui',
		admin: {
			components: {
				Field: {
					path: cleanPath(import.meta.url),
					serverProps: props,
				},
			},
		},
	}
}
