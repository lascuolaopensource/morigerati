'use client'
import React, { useEffect, useRef, useState } from 'react'

import { Media } from '@/payload-types'
import { getMediaURL } from '@/utils/getMediaUrl'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Mousewheel } from 'swiper/modules'
import type SwiperCore from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import ImageCard from './imageCard'

interface GalleriaProps {
  items: (string | Media)[] | null | undefined
}

const Galleria: React.FC<GalleriaProps> = ({ items }) => {
  const swiperRef = useRef<SwiperCore | null>(null)
  const [fullscreenItem, setFullscreenItem] = useState<string | null>(null)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const swiperInstance = swiperRef.current
      if (swiperInstance) {
        // Se l'utente sta scrollando verticalmente, ignora lo scroll di Swiper
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          swiperInstance.mousewheel.disable()
        } else {
          swiperInstance.mousewheel.enable()
        }
      }
    }

    window.addEventListener('wheel', handleWheel)

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [])

  if (items === null || items === undefined) return null

  const handleImageClick = (item: string | Media) => {
    setFullscreenItem(getMediaURL(item))
  }

  const handleCloseFullscreen = () => {
    setFullscreenItem(null)
  }

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Mousewheel]}
        spaceBetween={10}
        slidesPerView={'auto'}
        mousewheel={true}
        className="mySwiper"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {items.map((item, index) => (
          <SwiperSlide
            style={{ width: 'auto' }}
            key={typeof item === 'string' ? index : item.id}
            onClick={() => handleImageClick(item)}
          >
            <ImageCard imageUrl={getMediaURL(item)} />
          </SwiperSlide>
        ))}
      </Swiper>

      {fullscreenItem && (
        <div className="fullscreen-overlay">
          <button className="close-button" onClick={handleCloseFullscreen}>
            X
          </button>
          <img src={fullscreenItem} alt="Fullscreen" className="fullscreen-image" />
        </div>
      )}

      <style jsx>{`
        .fullscreen-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .close-button {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
        }
        .fullscreen-image {
          max-width: 90%;
          max-height: 90%;
        }
      `}</style>
    </>
  )
}

export default Galleria
