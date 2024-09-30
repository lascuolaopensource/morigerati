import React from 'react'
import { Residenze } from '@/payload-types'
import datePharser from '@/utils/datePharser'

const InfoResidenza: React.FC<{ residenza: Residenze; onlyDate: Boolean }> = ({
  residenza,
  onlyDate,
}) => {
  return (
    <div className="flex flex-col">
      {!onlyDate && (
        <div className="flex h-24">
          <div className="flex justify-between flex-col flex-1 border-residenzeColorScuro border-2 bg-residenzeColor w-full mr-1">
            <div>
              <p className="p-0 pl-2">Inizio</p>
              <h4 className="p-0 pl-2 font-bold">
                {datePharser(residenza.data_inizio, 'Da definire')}
              </h4>
            </div>
            <div>
              <p className="p-0 pl-2">Fine</p>
              <h4 className="p-0 pl-2 font-bold">
                {datePharser(residenza.data_fine, 'Da definire')}
              </h4>
            </div>
          </div>
          <div className="flex justify-center flex-col flex-1 border-residenzeColorScuro border-2 bg-residenzeColor w-full">
            <p className="p-0 pl-2">Deadline iscrizioni</p>
            <h4 className="p-0 pl-2 font-bold">
              {datePharser(residenza.deadline_iscrizione, 'Da definire')}
            </h4>
          </div>
        </div>
      )}
      <div className="flex flex-col h-24 border-residenzeColorScuro border-2 bg-residenzeColor justify-center mt-1">
        <h4 className="text-center p-0 font-bold">{residenza.indirizzo}</h4>
      </div>
    </div>
  )
}

export default InfoResidenza
