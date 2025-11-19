import { useTranslations } from 'next-intl'

import { InfoSection } from '@/modules/components/info-section'
import { RichText } from '@/modules/components/richtext'
import { cn } from '@/modules/components/shadcn/lib/utils'
import { Residenze } from '@/payload-types'

//

interface Props {
	program: Residenze['program']
}

export function ProgrammaSection(props: Props) {
	const { program } = props
	const t = useTranslations('residenze')

	if (!program || program.length === 0) return null

	return (
		<InfoSection title={t('program')} collection="residenze">
			<table>
				<tbody>
					{program.map((step, index) => (
						<tr key={index} className={cn('border-residenze', index != 0 && 'border-t-2')}>
							<td className="py-4 pr-4 font-bold align-top">{step.step_name}</td>
							<td className="py-4 align-top">
								{step.step_description && <RichText data={step.step_description} />}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</InfoSection>
	)
}

//
