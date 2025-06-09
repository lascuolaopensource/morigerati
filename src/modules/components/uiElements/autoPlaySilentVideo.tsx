'use client'
import React, { useRef, useEffect } from 'react'

interface AutoPlaySilentVideoProps {
  video: string
  className: string
}

const AutoPlaySilentVideo: React.FC<AutoPlaySilentVideoProps> = ({ video, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true
    }
  })
  return (
    <video className={className} ref={videoRef} loop autoPlay muted playsInline>
      <source src={video} type="video/mp4" />
    </video>
  )
}

export default AutoPlaySilentVideo
