'use client'
import React, { useState, useRef, useCallback, useEffect } from 'react'
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
import { GalleriaProps } from './types'

const swiperParams: SwiperOptions = {
  modules: [Navigation, Pagination, Keyboard, Mousewheel],
  mousewheel: true,
  keyboard: true,
  spaceBetween: 20,
  slidesPerView: 'auto',
  initialSlide: 0,
  watchSlidesProgress: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
    bulletActiveClass: 'bullet-active',
  },
}

const Galleria: React.FC<GalleriaProps> = ({ items, titleColor }) => {
  const [showGallery, setShowGallery] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const swiperRef = useRef<SwiperCore | null>(null)

  const handleSlideClick = useCallback((index: number) => {
    setSelectedIndex(index)
    setShowGallery(true)
  }, [])

  const handleCloseGallery = useCallback(() => {
    setShowGallery(false)
  }, [])

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
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

  if (!items?.length) return null

  return (
    <div className="w-full overflow-hidden">
      <h2 className={`text-center pb-4 ${titleColor}`}>Galleria</h2>
      <div className="w-full px-4">
        <div className="w-full">
          <div className="relative pb-12">
            <Swiper
              {...swiperParams}
              className="!flex overflow-visible"
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {items.map((item, index) => (
                <SwiperSlide
                  key={item.id}
                  onClick={() => handleSlideClick(index)}
                  className="!w-auto"
                >
                  <GalleryCard media={item} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-pagination absolute bottom-8" />
          </div>
        </div>
      </div>
      {showGallery && (
        <MediaGallery items={items} initialIndex={selectedIndex} onClose={handleCloseGallery} />
      )}
    </div>
  )
}

export default Galleria
