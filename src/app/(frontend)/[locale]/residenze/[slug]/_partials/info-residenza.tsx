import { useTranslations } from 'next-intl'

import { Button } from '@/modules/components/button'
import { PixelBorder } from '@/modules/components/pixel-border'
import { formatDate } from '@/modules/utils'
import { Residenze } from '@/payload-types'

type Props = {
	residenza: Residenze
}

export function InfoResidenza(props: Props) {
	const { residenza } = props
	const t = useTranslations('residenze')

	const state = getResidenzaState(residenza)
	console.log(state)
	if (state === 'no-registration' || state === 'started') return null

	let text = ''
	if (state === 'temporarily-closed') {
		text = t('states.temporarily-closed')
	} else if (state === 'enrollments-open') {
		text = t('states.enrollments-open')
	} else if (state === 'enrollments-closed') {
		text = t('states.enrollments-closed')
	}

	return (
		<div className="bg-black -rotate-1 ">
			<PixelBorder className="bg-residenze" />
			<div className="space-y-4 p-6">
				<p className="text-white text-center text-2xl text-balance">{text}</p>
				{state === 'enrollments-open' &&
					residenza.registration_url &&
					residenza.registration_deadline && (
						<>
							<p className="text-white text-center">
								{t('you_have_time_until', { date: formatDate(residenza.registration_deadline) })}
							</p>
							<Button href={residenza.registration_url} target="_blank">
								{t('enroll')}
							</Button>
						</>
					)}
			</div>
			<PixelBorder className="bg-residenze" />
		</div>
	)
}

//

type ResidenzaState =
	| 'no-registration'
	| 'temporarily-closed'
	| 'enrollments-open'
	| 'started'
	| 'enrollments-closed'

export function getResidenzaState(residenza: Residenze): ResidenzaState {
	const { start_date, registration_deadline, registration_open, has_registration } = residenza

	const now = new Date()
	const startDate = new Date(start_date)

	if (!has_registration) {
		return 'no-registration'
	} else {
		// In this case registration_deadline and registration_url exist for sure
		const deadlineDate = new Date(registration_deadline!)
		if (now >= startDate) {
			return 'started'
		} else if (now > deadlineDate && now < startDate) {
			return 'enrollments-closed'
		} else {
			if (registration_open) {
				return 'enrollments-open'
			} else {
				return 'temporarily-closed'
			}
		}
	}
}
