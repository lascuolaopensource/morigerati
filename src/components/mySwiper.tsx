'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Polaroid from './polaroid'
import { Itinerari, Luoghi, Stakeholder, Residenze, Media } from '@/payload-types'

type SwiperItem = Itinerari | Luoghi | Stakeholder | Residenze | string

interface MySwiperProps {
  items: SwiperItem[] | null | undefined
  color: string
}

const MySwiper: React.FC<MySwiperProps> = ({ items, color }) => {
  if (!items || items.length === 0) {
    return null
  }

  const getImageUrl = (item: SwiperItem): string => {
    if (typeof item === 'string') {
      return '/path/to/stock-image.jpg'
    }

    if ('media' in item && item.media) {
      return getMediaUrl(item.media)
    }
    if ('call_media' in item && item.call_media) {
      return getMediaUrl(item.call_media)
    }

    return '/path/to/stock-image.jpg'
  }

  const getMediaUrl = (media: string | Media | null): string => {
    if (typeof media === 'string') {
      return media
    }
    if (media && 'url' in media && media.url) {
      return media.url
    }
    return '/path/to/stock-image.jpg'
  }

  const createPolaroid = (item: SwiperItem, index: number) => (
    <SwiperSlide key={typeof item === 'string' ? item : item.id || index}>
      <Polaroid
        color={color}
        title={typeof item === 'string' ? 'Unknown' : item.nome}
        imageUrl={getImageUrl(item)}
      />
    </SwiperSlide>
  )

  return (
    <Swiper slidesPerView={2} spaceBetween={40}>
      {items.map(createPolaroid)}
    </Swiper>
  )
}

export default MySwiper
