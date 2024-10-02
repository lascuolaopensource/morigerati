'use client'
import React from 'react'

import { Media } from '@/payload-types'
import { getMediaURL } from '@/utils/getMediaUrl'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Mousewheel } from 'swiper/modules'

import Polaroid from '../polaroid'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import ImageCard from './imageCard'

interface galleriaProps {
  items: (string | Media)[] | null | undefined
}

const Galleria: React.FC<galleriaProps> = ({ items }) => {
  if (items === null || items === undefined) return null
  return (
    <Swiper
      modules={[Navigation, Pagination, Mousewheel]}
      spaceBetween={10}
      slidesPerView={'auto'}
      mousewheel={true}
      className="mySwiper"
    >
      {items.map((item, index) => (
        <SwiperSlide style={{ width: 'auto' }} key={typeof item === 'string' ? index : item.id}>
          <ImageCard imageUrl={getMediaURL(item)} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Galleria
