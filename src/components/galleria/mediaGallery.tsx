import React, { useState } from 'react'
import Image from 'next/image'
import { Media } from '@/payload-types'
import { getMediaURL } from '@/utils/getMediaUrl'

interface GalleriaProps {
  items: (string | Media)[] | null | undefined
  initialIndex?: number
  onClose: () => void
}

const MediaGallery: React.FC<GalleriaProps> = ({ items, initialIndex = 0, onClose }) => {
  if (items === null || items === undefined) return null

  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
  }

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1))
  }

  const renderMedia = (item: string | Media) => {
    const mediaUrl = getMediaURL(item)
    if (typeof item === 'string' || mediaUrl.match(/\.(jpeg|jpg|gif|png)$/)) {
      return <Image src={mediaUrl} alt="Gallery Image" layout="fill" objectFit="contain" />
    } else if (mediaUrl.match(/\.(mp4|webm|ogg)$/)) {
      return <video src={mediaUrl} controls style={{ width: '100%', height: '100%' }} />
    } else {
      return null
    }
  }

  return (
    <div className="fixed inset-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50">
      <button
        onClick={handlePrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 text-white"
      >
        Previous
      </button>
      <div className="relative w-4/5 h-4/5">{renderMedia(items[currentIndex])}</div>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 text-white"
      >
        Next
      </button>
      <button onClick={onClose} className="absolute top-4 right-4 z-10 text-white">
        X
      </button>
    </div>
  )
}

export default MediaGallery
