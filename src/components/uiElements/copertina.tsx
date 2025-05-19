//Boilerplate
import React from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'

interface CopertinaProps {
  copertina: Media
}

const Copertina: React.FC<CopertinaProps> = ({ copertina }) => {
  if (!copertina) {
    return null
  }

  if (copertina.mimeType?.startsWith('video')) {
    return null
  }

  return (
    <div className="relative w-screen h-[80vh] left-1/2 right-1/2 -mx-[50vw]">
      <Image
        src={copertina.url ?? ''}
        alt="Fullscreen Image"
        fill
        style={{ objectFit: 'cover' }}
        className="w-full h-full"
      />
      <div className="absolute inset-0"></div>
    </div>
  )
}

export default Copertina
