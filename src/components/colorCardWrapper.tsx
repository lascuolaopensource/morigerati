import React from 'react'
import Colorcard from '@/components/colorCard'
import { Luoghi, Itinerari, Stakeholder } from '@/payload-types'
import loremPic from '@/public/loremPic.png'

type SupportedDoc = Luoghi | Itinerari | Stakeholder

interface ColorCardWrapperProps {
  color: string
  docs: SupportedDoc[]
  previous: string
}

const ColorCardWrapper: React.FC<ColorCardWrapperProps> = ({ color, docs, previous }) => {
  if (!Array.isArray(docs) || docs.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1">
      {docs.map((doc) => {
        const imageUrl = getImageUrl(doc)
        return (
          <Colorcard
            key={doc.id}
            color={color}
            title={doc.nome}
            imageUrl={imageUrl || loremPic}
            slugUrl={doc.id}
            previous={previous}
          />
        )
      })}
    </div>
  )
}

function getImageUrl(doc: SupportedDoc): string | undefined {
  if ('media' in doc && doc.media && typeof doc.media !== 'string') {
    return doc.media.url ?? undefined
  }
  return undefined
}

export default ColorCardWrapper
