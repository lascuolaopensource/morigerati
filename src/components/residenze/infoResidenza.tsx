import React from 'react'
import { Residenze } from '@/payload-types'
import datePharser from '@/utils/datePharser'

const InfoResidenza: React.FC<{ residenza: Residenze }> = ({ residenza }) => {
  return (
    <div className="h-52 flex flex-col">
      <div className="flex">
        <div className="flex justify-end flex-col h-24 flex-1 bg-black w-full mr-1 mb-1 pb-1">
          <p className="flex-initial text-white p-0 pl-2">Inizio</p>

          <h4 className="flex-initial text-white p-0 pl-2 font-bold">
            {datePharser(residenza.data_inizio, 'Da definire')}
          </h4>
          <p className="flex-initial text-white p-0 pl-2">Fine</p>
          <h4 className="flex-initial text-white p-0 pl-2 font-bold">
            {datePharser(residenza.data_fine, 'Da definire')}
          </h4>
        </div>
        <div className="flex justify-end flex-col h-24 flex-1 bg-black w-full mb-1 pb-1">
          <p className="flex-initial text-white p-0 pl-2">deadline iscrizioni</p>
          <h4 className="flex-initial text-white p-0 pl-2 font-bold">
            {datePharser(residenza.deadline_iscrizione, 'Da definire')}
          </h4>
        </div>
      </div>
      <div className="flex flex-col h-24 flex-1 bg-black  justify-center">
        <h4 className="text-center text-white p-0 pl-2 font-bold justify-center">
          {residenza.indirizzo}
        </h4>
      </div>
    </div>
  )
}

export default InfoResidenza
