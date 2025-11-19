import { Residenze } from '@/payload-types'

//

type ResidenzaState = 'notAnnounced' | 'cannotEnroll' | 'canEnroll' | 'started'

export function getResidenzaState(residenza: Residenze): ResidenzaState {
	const { start_date, registration_deadline, registration_url, show_registration_button } =
		residenza

	const startDate = new Date(start_date)
	const hasStarted = startDate <= new Date()
	if (hasStarted) return 'started'

	if (!registration_deadline || !registration_url || !show_registration_button)
		return 'notAnnounced'

	const deadlineDate = new Date(registration_deadline)
	const hasDeadlinePassed = deadlineDate <= new Date()

	if (hasDeadlinePassed) return 'cannotEnroll'

	return 'canEnroll'
}
