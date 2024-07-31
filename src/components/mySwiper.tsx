'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import Polaroid from './polaroid'
import { Itinerari, Luoghi, Stakeholder, Residenze } from '@/payload-types'

type SwiperItem = Itinerari | Luoghi | Stakeholder | Residenze

interface MySwiperProps {
  items: SwiperItem[]
  color: string
  type: 'itinerari' | 'luoghi' | 'stakeholders' | 'residenze'
}

const MySwiper: React.FC<MySwiperProps> = ({ items, color, type }) => {
  if (!items || items.length === 0) {
    return null
  }

  const getImageUrl = (item: SwiperItem): string => {
    if ('media' in item && item.media) {
      return typeof item.media === 'string' ? item.media : item.media.url || ''
    }
    if ('call_media' in item && item.call_media) {
      return typeof item.call_media === 'string' ? item.call_media : item.call_media.url || ''
    }
    return '/loermPic.png'
  }

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={'auto'}
      pagination={{ clickable: true }}
      className="mySwiper"
    >
      {items.map((item) => (
        <SwiperSlide style={{ width: 'auto' }} key={item.id}>
          <Polaroid
            imageUrl={getImageUrl(item)}
            title={item.nome}
            color={color}
            link={`/${type}/${item.id}`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default MySwiper
