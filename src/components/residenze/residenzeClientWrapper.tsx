'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ColorCardWrapper from '@/components/colorCardWrapper'
import PassateFuture from '@/components/residenze/passateFuture'
import { Residenze as ResidenzaType, Testi } from '@/payload-types'
import { loadDb } from '@/utils/db'

interface ResidenzaClientWrapperProps {
  initialResidenze: ResidenzaType[]
  initialFilter: 'passate' | 'future'
  testi: Testi
}

const ResidenzaClientWrapper: React.FC<ResidenzaClientWrapperProps> = ({
  initialResidenze,
  initialFilter,
  testi,
}) => {
  const [residenze, setResidenze] = useState(initialResidenze)
  const [filter, setFilter] = useState(initialFilter)
  const router = useRouter()

  useEffect(() => {
    const fetchResidenze = async () => {
      const db = await loadDb()
      const filteredResidenze = await db.find({
        collection: 'residenze',
        where: {
          passata_futura: {
            equals: filter,
          },
        },
      })
      setResidenze(filteredResidenze.docs)
    }

    fetchResidenze()
  }, [filter])

  const handleFilterChange = (newFilter: 'passate' | 'future') => {
    setFilter(newFilter)
    router.push(`/residenze?filter=${newFilter}`, { scroll: false })
  }

  return (
    <>
      <PassateFuture selected={filter} onSelect={handleFilterChange} />
      <ColorCardWrapper
        color="residenzeColor"
        colorScuro="residenzeColorScuro"
        docs={residenze}
        previous="residenze"
      />
    </>
  )
}

export default ResidenzaClientWrapper
