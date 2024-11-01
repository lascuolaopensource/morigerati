import React from 'react'
import Image from 'next/image'
import { type Media } from '@/payload-types'

interface mediaProps {
  media: Media | undefined
}

const MediaViewer: React.FC<mediaProps> = ({ media }) => {
  if (!media || typeof media === 'string') {
    return null
  }

  const isVideo = media.mimeType?.startsWith('video/')

  return (
    <div className=" h-max left-1/2 right-1/2 pt-4">
      {isVideo ? (
        <video className="w-full h-full r" playsInline controls={true}>
          <source src={media.url || ''} type={media.mimeType || ''} />
        </video>
      ) : (
        <Image
          src={media.url || ''}
          alt={media.alt || 'Fullscreen Image'}
          layout="responsive"
          width={100}
          height={100}
        />
      )}
      <div className=""></div>
    </div>
  )
}

export default MediaViewer
