'use client'
import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

interface VideoThumbProps {
  videoUrl: string
}

const VideoThumb: React.FC<VideoThumbProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)

  const captureThumbnail = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')

      video.currentTime = 1

      video.onloadeddata = () => {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        if (context) {
          context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
          // Ottieni l'URL dell'immagine dal canvas
          const imageUrl = canvas.toDataURL('image/jpeg')
          setThumbnailUrl(imageUrl)
          localStorage.setItem('thumbnailUrl', imageUrl)
        }
      }
    }
  }

  useEffect(() => {
    const savedThumbnailUrl = localStorage.getItem('thumbnailUrl')
    if (savedThumbnailUrl) {
      setThumbnailUrl(savedThumbnailUrl)
    } else {
      captureThumbnail()
    }
  }, [])

  return (
    <div>
      {thumbnailUrl ? (
        <Image src={thumbnailUrl} alt="" fill style={{ objectFit: 'cover' }} />
      ) : (
        <>
          <video ref={videoRef} src={videoUrl} style={{ display: 'none' }} />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </>
      )}
    </div>
  )
}

export default VideoThumb
