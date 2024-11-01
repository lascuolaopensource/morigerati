import React from 'react'
import Colorcard from '@/components/colorCard/colorCard'
import { Luoghi, Itinerari, Stakeholder, Residenze, Media } from '@/payload-types'

type SupportedDoc = Luoghi | Itinerari | Stakeholder | Residenze

interface ColorCardWrapperProps {
  color: string
  colorScuro: string
  docs: SupportedDoc[]
  previous: string
}

const ColorCardWrapper: React.FC<ColorCardWrapperProps> = ({
  color,
  colorScuro,
  docs,
  previous,
}) => {
  if (!Array.isArray(docs) || docs.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1">
      {docs.map((doc) => {
        const media = doc.copertina as Media | undefined
        return (
          <Colorcard
            key={doc.id}
            color={color}
            colorScuro={colorScuro}
            title={doc.nome}
            media={media}
            slugUrl={doc.id}
            previous={previous}
          />
        )
      })}
    </div>
  )
}

export default ColorCardWrapper
