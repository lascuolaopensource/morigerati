import type { Residenze } from '@/payload-types'
import formatDate from '@/utils/formatDate'
import { useLocale, useMessages, useTranslations } from 'next-intl'
import { BentoBoxItem } from '@/components/uiElements/bentoBoxItem'
import { Button } from '@/components/uiElements/button'
import { ArrowRight } from 'lucide-react'
import { getResidenzaState } from './utils'
import { T } from '@/components/uiElements/t'

interface InfoResidenzaProps {
  residenza: Residenze
  canEnroll?: boolean
}

function InfoResidenza({ residenza, canEnroll = true }: InfoResidenzaProps) {
  const locale = useLocale()
  const messages = useTranslations()
  const t = useMessages()

  const state = getResidenzaState(residenza)

  const datesRow = (
    <div className="grid grid-cols-2 gap-2 w-full">
      <BentoBoxItem
        label={messages('residenze.startDate')}
        value={
          formatDate(residenza.data_inizio, messages('residenze.dateToBeDefined'), false, locale) ||
          messages('residenze.dateToBeDefined')
        }
      />
      {residenza.data_fine && (
        <BentoBoxItem
          label={messages('residenze.endDate')}
          value={
            formatDate(residenza.data_fine, messages('residenze.dateToBeDefined'), false, locale) ||
            messages('residenze.dateToBeDefined')
          }
        />
      )}
    </div>
  )

  return (
    <>
      <div className="grid gap-2 w-full">
        <BentoBoxItem
          label={messages('residenze.address')}
          value={residenza.indirizzo || messages('residenze.addressNotAvailable')}
        />

        {datesRow}

        {state == 'canEnroll' && (
          <BentoBoxItem
            label={messages('residenze.registrationDeadline')}
            value={
              formatDate(
                residenza.deadline_iscrizione,
                messages('residenze.dateToBeDefined'),
                false,
                locale,
              ) || messages('residenze.dateToBeDefined')
            }
          />
        )}

        {state == 'notAnnounced' && (
          <BentoBoxItem label={messages('residenze.registrationDeadline')}>
            <p className="text-center text-lg bg-white/20 rounded-md p-3 leading-[1.2] font-semibold">
              {messages('residenze.enrollmentNotAvailable')}
            </p>
          </BentoBoxItem>
        )}

        {state == 'cannotEnroll' && (
          <BentoBoxItem label={messages('residenze.registrationDeadline')}>
            <T>La deadline per l'iscrizione è passata. Non è più possibile iscriversi.</T>
          </BentoBoxItem>
        )}
      </div>

      {state == 'canEnroll' && (
        <Button className="w-full" href={residenza.link_iscrizione!} size="lg" target="_blank">
          <ArrowRight />
          <span> {t.residenze.register}!</span>
        </Button>
      )}
    </>
  )
}

export default InfoResidenza
