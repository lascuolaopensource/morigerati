'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { MediaGalleryProps } from './types'
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa'

const MediaGallery: React.FC<MediaGalleryProps> = ({ items, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const handleNext = useCallback(() => {
    if (!items?.length) return
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
  }, [items?.length])

  const handlePrevious = useCallback(() => {
    if (!items?.length) return
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1))
  }, [items?.length])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          handleNext()
          break
        case 'ArrowLeft':
          handlePrevious()
          break
        case 'Escape':
          onClose()
          break
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyPress)

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleNext, handlePrevious, onClose])

  if (!items?.length) return null

  const currentItem = items[currentIndex]
  if (!currentItem) return null

  const renderMedia = () => {
    const isVideo = currentItem.mimeType?.startsWith('video/')

    if (isVideo && currentItem.url) {
      return (
        <video
          src={currentItem.url as string}
          controls
          autoPlay
          className="w-full h-full object-contain"
          controlsList="nodownload"
        />
      )
    }

    // Per le immagini, usa la versione large se disponibile
    const imageUrl = currentItem.sizes?.large?.url || currentItem.url

    return (
      <div className="relative w-full h-full">
        <Image
          src={imageUrl || ''}
          alt={currentItem.alt || ''}
          fill
          className="object-contain"
          priority
          sizes="100vw"
        />
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 w-full h-full bg-black/80 flex justify-center items-center z-[999]"
      onClick={onClose}
    >
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
        onClick={(e) => {
          e.stopPropagation()
          handlePrevious()
        }}
      >
        <FaChevronLeft size={30} />
      </button>

      <div className="relative w-4/5 h-4/5" onClick={(e) => e.stopPropagation()}>
        {renderMedia()}
      </div>

      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
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
        className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
      >
        <FaTimes size={30} />
      </button>
    </div>
  )
}

export default MediaGallery
