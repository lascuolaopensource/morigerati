import React from 'react'
import Colorcard from '@/components/colorCard/colorCard'
import { Luoghi, Itinerari, Stakeholder, Residenze, Media } from '@/payload-types'
import Card from '@/components/card/card'

interface ColorCardWrapperProps {
  docs: Itinerari[] | Luoghi[] | Stakeholder[] | Residenze[]
  category: 'luoghi' | 'stakeholders' | 'itinerari' | 'residenze'
}

const ColorCardWrapper: React.FC<ColorCardWrapperProps> = ({ docs, category }) => {
  if (!Array.isArray(docs) || docs.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-5 sm:px-4">
      {docs.map((doc) => {
        return (
          <Card
            key={doc.id}
            collection={doc}
            title={doc.nome}
            media={doc.copertina as Media | undefined}
            slugUrl={`/${doc}/${doc.id}`}
            category={category}
          />
        )
      })}
    </div>
  )
}

export default ColorCardWrapper
