import { type Residenze } from '@/payload-types'
import formatDate from '@/utils/formatDate'

interface InfoResidenzaProps {
  residenza: Residenze
  onlyDate?: boolean
}

const DateSection = ({ label, date }: { label: string; date: string | null }) => (
  <div className="mb-1 ">
    <span className="pl-2 text-sm text-black">{label} </span>
    <span className="pl-1 font-bold text-sm">{formatDate(date, 'Da definire')}</span>
  </div>
)

const DateRangeBox = ({ residenza }: { residenza: Residenze }) => (
  <div className="flex pt-1 flex-1 flex-col justify-end border-2 border-residenzeColorScuro bg-residenzeColor ">
    <div>
      <DateSection label="Dal" date={residenza.data_inizio ?? null} />
      <DateSection label="al" date={residenza.data_fine ?? null} />
    </div>
  </div>
)

const DeadlineBox = ({ deadline }: { deadline: string | null }) => (
  <div className="pb-1 flex flex-1 flex-col justify-end border-2 border-residenzeColorScuro bg-residenzeColor ">
    <div>
      <div className="mb-1 pl-2 ">
        <span className="text-sm text-black">Deadline iscrizioni</span>
      </div>
      <div>
        <span className="font-bold text-sm pl-2">{formatDate(deadline, 'Da definire')}</span>
      </div>
    </div>
  </div>
)

const AddressBox = ({ address }: { address: string | undefined }) => (
  <div className="mt-1 flex h-24 flex-col justify-center border-2 border-residenzeColorScuro bg-residenzeColor">
    <h4 className="p-0 text-center font-bold">{address}</h4>
  </div>
)

export default function InfoResidenza({ residenza, onlyDate = false }: InfoResidenzaProps) {
  return (
    <div className="flex flex-col">
      {!onlyDate ? (
        <>
          <div className="flex h-24 gap-1">
            <DateRangeBox residenza={residenza} />
            <DeadlineBox deadline={residenza.deadline_iscrizione ?? null} />
          </div>
          <AddressBox address={residenza.indirizzo ?? undefined} />
        </>
      ) : (
        <DateRangeBox residenza={residenza} />
      )}
    </div>
  )
}
