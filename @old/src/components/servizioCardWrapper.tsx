import React from 'react'
import ServizioCard from '@/components/servizioCard'
import { RootNode } from '@/utils/renderElement'

interface Servizio {
  nome: string
  testo: {
    root: RootNode
  }
  link: string
}

interface ServiziWrapperProps {
  servizi: Servizio[] | any[]
}

const ServiziCardWrapper: React.FC<ServiziWrapperProps> = ({ servizi }) => {
  if (!servizi || servizi.length === 0) {
    return null
  }

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Servizi</h2>
      <div className="space-y-4">
        {servizi.map((servizio, index) => (
          <ServizioCard
            key={index}
            nome={servizio.nome}
            testo={servizio.testo}
            link={servizio.link}
          />
        ))}
      </div>
    </div>
  )
}

export default ServiziCardWrapper
