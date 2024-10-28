'use client'

import React from 'react'
import Image from 'next/image'
import { Media } from '@/payload-types'

interface GalleryCardProps {
  media: Media
}

const GalleryCard: React.FC<GalleryCardProps> = ({ media }) => {
  const isVideo = media.mimeType?.startsWith('video/')

  return (
    <div className="w-40 pb-1">
      <div className="border-2 border-black rounded overflow-hidden transition-transform duration-300 ease-in-out hover:scale-95">
        <div className="relative w-full h-60">
          {isVideo ? (
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              controls={false}
            >
              <source src={media.url || ''} type={media.mimeType || ''} />
            </video>
          ) : (
            <Image src={media.url || ''} alt={media.alt || ''} fill className="object-cover" />
          )}
        </div>
      </div>
    </div>
  )
}

export default GalleryCard
