'use client'
import React, { useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Keyboard, Mousewheel } from 'swiper/modules'
import type { SwiperOptions } from 'swiper/types'
import type SwiperCore from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Polaroid from './polaroid'
import { Itinerari, Luoghi, Stakeholder, Residenze, Media } from '@/payload-types'

interface MySwiperProps {
  items: Itinerari[] | Luoghi[] | Stakeholder[] | Residenze[]
  color: string
  type: string
}

const MySwiper: React.FC<MySwiperProps> = ({ items, color, type }) => {
  const swiperRef = useRef<SwiperCore | null>(null)

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

  if (!items || items.length === 0) {
    return null
  }

  const swiperParams: SwiperOptions = {
    modules: [Navigation, Pagination, Keyboard, Mousewheel],
    mousewheel: true,
    keyboard: true,
    spaceBetween: 20,
    slidesPerView: 'auto',
    freeMode: true,
    touchReleaseOnEdges: true,
  }

  return (
    <Swiper
      {...swiperParams}
      className="mySwiper"
      onSwiper={(swiper) => (swiperRef.current = swiper)}
    >
      {items.map((item, index) => (
        <SwiperSlide style={{ width: 'auto' }} key={typeof item === 'string' ? index : item.id}>
          <Polaroid
            media={item.copertina as Media | undefined}
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
