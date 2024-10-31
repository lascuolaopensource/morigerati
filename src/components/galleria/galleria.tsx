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
}

const swiperParams: SwiperOptions = {
  modules: [Navigation, Pagination, Keyboard, Mousewheel],
  mousewheel: true,
  keyboard: true,
  spaceBetween: 10,
  slidesPerView: 'auto',
  freeMode: true,
  touchReleaseOnEdges: true,
}

const Galleria: React.FC<GalleriaProps> = ({ items }) => {
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
    <div>
      {' '}
      <h2 className="text-center pt-8">Galleria</h2>
      <>
        <Swiper
          {...swiperParams}
          className="mySwiper"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {items.map((item, index) => (
            <SwiperSlide
              style={{ width: 'auto' }}
              key={item.id}
              onClick={() => handleSlideClick(index)}
            >
              <GalleryCard media={item as Media} />
            </SwiperSlide>
          ))}
        </Swiper>
        {showGallery && (
          <MediaGallery
            items={items}
            initialIndex={selectedIndex}
            onClose={() => setShowGallery(false)}
          />
        )}
      </>
    </div>
  )
}

export default Galleria
