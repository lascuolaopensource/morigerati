'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Polaroid from './polaroid'
import { Itinerari, Luoghi, Stakeholder, Residenze, Media } from '@/payload-types'

import { getMediaURL } from '@/utils/getMediaUrl'

interface MySwiperProps {
  items: Itinerari[] | Luoghi[] | Stakeholder[] | Residenze[]
  color: string
  type: string
}

const MySwiper: React.FC<MySwiperProps> = ({ items, color, type }) => {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Mousewheel]}
      spaceBetween={20}
      slidesPerView={'auto'}
      mousewheel={true}
      className="mySwiper"
    >
      {items.map((item, index) => (
        <SwiperSlide style={{ width: 'auto' }} key={typeof item === 'string' ? index : item.id}>
          <Polaroid
            imageUrl={getMediaURL(item.copertina)}
            title={typeof item === 'string' ? `Item ${index + 1}` : item.nome}
            color={color}
            link={typeof item === 'string' ? '#' : `/${type}/${item.id}`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default MySwiper
