import React from 'react'
import { Itinerari } from '@/payload-types'
import renderElement from '@/utils/renderElement'

type Servizio = NonNullable<Itinerari['servizi']>[number]

interface ServiziWrapperProps {
  servizi: Itinerari['servizi']
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
            key={servizio.id || index}
            nome={servizio.nome}
            testo={servizio.testo}
            link={servizio.link}
          />
        ))}
      </div>
    </div>
  )
}

interface ServizioCardProps {
  nome: Servizio['nome']
  testo: Servizio['testo']
  link: Servizio['link']
}

const ServizioCard: React.FC<ServizioCardProps> = ({ nome, testo, link }) => {
  return (
    <div className="border-2 border-black rounded-lg overflow-hidden flex">
      <div className="w-3/4 p-4">
        <h3 className="text-xl font-bold mb-2">{nome}</h3>
        <div className="text-xs mb-4">
          {testo && testo.root ? renderElement([testo.root]) : 'Nessuna descrizione disponibile'}
        </div>
        {link && (
          <a
            href={link}
            className="border-2 border-black inline-block bg-itinerarioColor text-black px-4 py-2 rounded-md"
          >
            prenota
          </a>
        )}
      </div>
      <div className="w-1/4 bg-gray-200">{/* img */}</div>
    </div>
  )
}

export { ServiziCardWrapper, ServizioCard }
