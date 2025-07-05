//Boilerplate
import React from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'

//

interface CopertinaProps {
  copertina: Media | string | undefined | null
  className?: string
}

const Copertina: React.FC<CopertinaProps> = ({ copertina, className = '' }) => {
  if (!copertina || typeof copertina === 'string') {
    return null
  }

  if (copertina.mimeType?.startsWith('video')) {
    return null
  }

  return (
    <div className={`relative h-[50vh] max-h-[600px] ${className}`}>
      <Image
        src={copertina.url ?? ''}
        alt={copertina.alt}
        unoptimized={true}
        fill
        className="object-cover"
      />
    </div>
  )
}

export default Copertina
