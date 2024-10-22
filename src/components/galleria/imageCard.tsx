'use client'
import React from 'react'
import Image, { StaticImageData } from 'next/image'
import VideoThumb from './videoThumb'

interface PolaroidProps {
  imageUrl: string | StaticImageData
}

const ImageCard: React.FC<PolaroidProps> = ({ imageUrl }) => {
  const isVideo =
    typeof imageUrl === 'string' &&
    (imageUrl.endsWith('.mp4') || imageUrl.endsWith('.webm') || imageUrl.endsWith('.ogg'))

  return (
    <div className="w-40 pb-1">
      <div className="border-2 border-black rounded overflow-hidden transition-transform duration-300 ease-in-out hover:scale-95">
        <div className="relative w-full h-60">
          {isVideo ? (
            <VideoThumb videoUrl={imageUrl} />
          ) : (
            <Image src={imageUrl} alt="" fill style={{ objectFit: 'cover' }} />
          )}
        </div>
      </div>
    </div>
  )
}

export default ImageCard
