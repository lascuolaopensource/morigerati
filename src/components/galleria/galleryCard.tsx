'use client'

import React from 'react'
import Image from 'next/image'
import { GalleryCardProps } from './types'

const DEFAULT_HEIGHT = 240
const MOBILE_HEIGHT = 180

const GalleryCard: React.FC<GalleryCardProps> = ({ media, height = DEFAULT_HEIGHT }) => {
  const isVideo = media.mimeType?.startsWith('video/')
  const aspectRatio = media.width && media.height ? `${media.width}/${media.height}` : '1/1'

  if (!media.url) return null

  return (
    <div
      style={{
        aspectRatio,
      }}
      className="relative border-2 border-black rounded overflow-hidden transition-transform duration-300 ease-in-out hover:scale-95 cursor-pointer h-[180px] sm:h-[240px] max-w-[calc(100vw-4rem)] sm:max-w-none"
    >
      {isVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
        >
          <source src={media.url} type={media.mimeType || undefined} />
        </video>
      ) : (
        <Image
          src={media.url}
          alt={media.alt || ''}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
    </div>
  )
}

export default GalleryCard
