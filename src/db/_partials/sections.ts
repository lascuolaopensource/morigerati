import { Field, slugField } from 'payload'

import * as F from './fields'

//

type Section = Field[]

//

export function generale(): Section {
	return [
		F.header('Generale'),
		F.row([
			F.name,
			slugField({
				fieldToUse: F.name.name,
			}),
		]),
		F.divider(),
	]
}
