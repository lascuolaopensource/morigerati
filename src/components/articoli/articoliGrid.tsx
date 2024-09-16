import React from 'react'
import { Articoli } from '@/payload-types'
import Image, { StaticImageData } from 'next/image'

interface ArticoliGridProps {
  articoli: Articoli[]
}

const ArticoliGrid: React.FC<ArticoliGridProps> = ({ articoli }): JSX.Element => {
  return (
    <>
      {articoli.map((articolo, n) => (
        <div>
          <p key={articolo.id}>{articolo.titolo ?? 'Senza Titolo'}</p>
          <Image
            src={
              typeof articolo.media === 'string'
                ? articolo.media
                : articolo.media?.url || '/placeholder-image.jpg'
            }
            alt={articolo.titolo || 'Immagine articolo'}
            width={40}
            height={40}
            className="object-cover"
          />
          <p>{n}</p>
        </div>
      ))}
    </>
  )
}

export default ArticoliGrid
