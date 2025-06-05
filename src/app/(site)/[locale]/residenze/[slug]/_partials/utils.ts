import { Residenze } from '@/payload-types'

export type ResidenzaState = 'notAnnounced' | 'cannotEnroll' | 'canEnroll' | 'started'

export function getResidenzaState(residenza: Residenze): ResidenzaState {
  const { data_inizio, deadline_iscrizione, link_iscrizione, mostra_pulsante_iscrizione } =
    residenza

  const startDate = new Date(data_inizio)
  const isStartPassed = startDate < new Date()
  if (isStartPassed) return 'started'

  if (!deadline_iscrizione || !link_iscrizione || !mostra_pulsante_iscrizione) return 'notAnnounced'

  const deadlineDate = new Date(deadline_iscrizione)
  const isDeadlinePassed = deadlineDate < new Date()

  if (isDeadlinePassed) return 'cannotEnroll'

  return 'canEnroll'
}
