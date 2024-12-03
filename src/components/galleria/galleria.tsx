'use client'
import React, { useState } from 'react'
import { Media } from '@/payload-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules'
import MediaGallery from '@/components/galleria/mediaGallery'
import GalleryCard from './galleryCard'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import type { SwiperOptions } from 'swiper/types'
import type SwiperCore from 'swiper'
import { useRef, useEffect } from 'react'

interface GalleriaProps {
  items: Media[] | undefined
  titleColor?: string
}

const swiperParams: SwiperOptions = {
  modules: [Navigation, Pagination, Keyboard, Mousewheel],
  mousewheel: true,
  keyboard: true,
  spaceBetween: 20,
  slidesPerView: 'auto',
  centeredSlides: true,
  initialSlide: 0,
  slideToClickedSlide: true,
  watchSlidesProgress: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },
}

const Galleria: React.FC<GalleriaProps> = ({ items, titleColor }) => {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const swiperInstance = swiperRef.current
      if (swiperInstance) {
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

  const [showGallery, setShowGallery] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const swiperRef = useRef<SwiperCore | null>(null)

  if (items === null || items === undefined) return null

  const handleSlideClick = (index: number) => {
    setSelectedIndex(index)
    setShowGallery(true)
  }

  return (
    <div className="w-full">
      <h2 className={`text-center pb-4 ${titleColor}`}>Galleria</h2>
      <div className="flex justify-center w-full px-4">
        <div className="w-full max-w-7xl relative pb-20">
          <Swiper
            {...swiperParams}
            className="!flex justify-center items-center"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {items.map((item, index) => (
              <SwiperSlide
                key={item.id}
                onClick={() => handleSlideClick(index)}
                className="!w-auto flex justify-center"
              >
                <GalleryCard media={item as Media} />
              </SwiperSlide>
            ))}
            <div className="swiper-pagination !bottom-4"></div>
          </Swiper>
        </div>
      </div>
      {showGallery && (
        <MediaGallery
          items={items}
          initialIndex={selectedIndex}
          onClose={() => setShowGallery(false)}
        />
      )}
    </div>
  )
}

export default Galleria
