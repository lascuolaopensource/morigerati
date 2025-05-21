//Boilerplate
import React from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'

//

interface CopertinaProps {
  copertina: Media | string | undefined
}

const Copertina: React.FC<CopertinaProps> = ({ copertina }) => {
  if (!copertina || typeof copertina === 'string') {
    return null
  }

  if (copertina.mimeType?.startsWith('video')) {
    return null
  }

  return (
    <div className="relative h-[50vh] max-h-[600px]">
      <Image src={copertina.url ?? ''} alt={copertina.alt} fill className="object-cover" />
    </div>
  )
}

export default Copertina
