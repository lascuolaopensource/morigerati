import React from 'react'
import Image from 'next/image'
import { type Media } from '@/payload-types'
import AutoPlaySilentVideo from './autoPlaySilentVideo'

interface CopertinaProps {
  copertina: Media | undefined
}

const Copertina: React.FC<CopertinaProps> = ({ copertina }) => {
  if (!copertina || typeof copertina === 'string') {
    return null
  }

  const isVideo = copertina.mimeType?.startsWith('video/')

  return (
    <div className="relative w-screen h-[80vh] left-1/2 right-1/2 -mx-[50vw]">
      {isVideo ? (
        <AutoPlaySilentVideo video={copertina.url || ''} className="w-full h-full object-cover" />
      ) : (
        <Image
          src={copertina.url || ''}
          alt={copertina.alt || 'Fullscreen Image'}
          fill
          style={{ objectFit: 'cover' }}
          className="w-full h-full"
        />
      )}
      <div className="absolute inset-0"></div>
    </div>
  )
}

export default Copertina
