'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Media } from '@/payload-types'
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa'

interface GalleriaProps {
  items: Media[] | null | undefined
  initialIndex?: number
  onClose: () => void
}

const MediaGallery: React.FC<GalleriaProps> = ({ items, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    // Blocca lo scroll quando il componente viene montato
    document.body.style.overflow = 'hidden'
    
    // Ripristina lo scroll quando il componente viene smontato
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  if (items === null || items === undefined) return null

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
  }

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1))
  }

  const renderMedia = (item: Media) => {
    const isVideo = item.mimeType?.startsWith('video/')

    if (!isVideo) {
      return (
        <div className="relative w-full h-full">
          <Image
            src={item.url || ''}
            alt={item.alt || 'Gallery Image'}
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
      )
    } else {
      return <video src={item?.url || ''} controls className="w-full h-full object-contain" />
    }
  }

  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-[999]"
      onClick={handleContainerClick}
    >
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 text-white"
        onClick={(e) => {
          e.stopPropagation()
          handlePrevious()
        }}
      >
        <FaChevronLeft size={30} />
      </button>
      <div className="relative w-4/5 h-4/5" onClick={(e) => e.stopPropagation()}>
        {renderMedia(items[currentIndex])}
      </div>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 text-white"
        onClick={(e) => {
          e.stopPropagation()
          handleNext()
        }}
      >
        <FaChevronRight size={30} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className="absolute top-4 right-4 z-10 text-white"
      >
        <FaTimes size={30} />
      </button>
    </div>
  )
}

export default MediaGallery
