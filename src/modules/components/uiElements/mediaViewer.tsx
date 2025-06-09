//Boilerplate
import React from 'react'
//DB
import { type Media } from '@/payload-types'

interface mediaProps {
  media: Media | undefined
}

const MediaViewer: React.FC<mediaProps> = ({ media }) => {
  if (!media || typeof media === 'string') {
    return null
  }

  return (
    <div className="h-max left-1/2 right-1/2">
      <video className="w-full h-full r" playsInline controls={true}>
        <source src={media.url || ''} />
      </video>
    </div>
  )
}

export default MediaViewer
