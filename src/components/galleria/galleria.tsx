'use client'
import React, { useState } from 'react'
import { Media } from '@/payload-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Mousewheel } from 'swiper/modules'
import MediaGallery from '@/components/galleria/mediaGallery'
import GalleryCard from './galleryCard'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface GalleriaProps {
  items: Media[] | undefined
}

const Galleria: React.FC<GalleriaProps> = ({ items }) => {
  const [showGallery, setShowGallery] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (items === null || items === undefined) return null

  const handleSlideClick = (index: number) => {
    setSelectedIndex(index)
    setShowGallery(true)
  }

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Mousewheel]}
        spaceBetween={10}
        slidesPerView={'auto'}
        mousewheel={true}
        className="mySwiper"
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
  )
}

export default Galleria
