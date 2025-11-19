import { RichText } from '@/modules/components/richtext'
import { Residenze } from '@/payload-types'

//

interface Props {
	program: Residenze['program']
}

export function ProgrammaResidenza(props: Props) {
	const { program } = props
	if (!program || program.length === 0) return null

	return (
		<table>
			<tbody>
				{program.map((step, index) => (
					<tr key={index} className="border-b-2 border-residenze">
						<td className="py-4 pr-4 font-bold align-top">{step.step_name}</td>
						<td className="py-4 align-top">
							{step.step_description && <RichText data={step.step_description} />}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
