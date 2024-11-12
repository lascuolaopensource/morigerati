'use client'

import React, { useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Keyboard, Mousewheel } from 'swiper/modules'
import type { SwiperOptions } from 'swiper/types'
import type SwiperCore from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Card from '../card'
import { Media } from '@/payload-types'
import { Itinerari, Luoghi, Stakeholder, Residenze } from '@/payload-types'

interface MySwiperProps {
  items: Itinerari[] | Luoghi[] | Stakeholder[] | Residenze[]
  category: 'luoghi' | 'stakeholders' | 'itinerari' | 'residenze'
  cardTitlePosition?: 'top' | 'bottom'
}

const MySwiper: React.FC<MySwiperProps> = ({ items, category, cardTitlePosition }) => {
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
      {items.map((item) => (
        <SwiperSlide style={{ width: 'auto' }} key={item.id}>
          <Card
            collection={item}
            title={item.nome}
            media={item.copertina as Media | undefined}
            slugUrl={`/${item}/${item.id}`}
            category={category}
            titlePosition={cardTitlePosition ?? 'top'}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default MySwiper
