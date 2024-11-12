'use client'
import React, { useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Keyboard, Mousewheel } from 'swiper/modules'
import type { SwiperOptions } from 'swiper/types'
import type SwiperCore from 'swiper'
import Masonry from 'react-masonry-css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Card from '../card'
import { Media } from '@/payload-types'
import { Itinerari, Luoghi, Stakeholder, Residenze } from '@/payload-types'

interface MySwiperProps {
  items?: (Itinerari | Luoghi | Stakeholder | Residenze)[] | null // Make items optional
  category: 'luoghi' | 'stakeholders' | 'itinerari' | 'residenze'
  cardTitlePosition?: 'top' | 'bottom'
  displayAs?: 'row' | 'grid'
}

const MySwiper: React.FC<MySwiperProps> = ({
  items = [], // Provide default empty array
  category,
  cardTitlePosition,
  displayAs = 'row',
}) => {
  const swiperRef = useRef<SwiperCore | null>(null)

  // Early return if no items
  if (!items || items.length === 0) {
    return null // Or return a placeholder/loading state
  }

  useEffect(() => {
    if (displayAs === 'row') {
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
    }
  }, [displayAs])

  const swiperParams: SwiperOptions = {
    modules: [Navigation, Pagination, Keyboard, Mousewheel],
    mousewheel: true,
    keyboard: true,
    spaceBetween: 12,
    slidesPerView: 'auto',
    freeMode: true,
    touchReleaseOnEdges: true,
  }

  const breakpointColumns = {
    default: 6,
    1536: 4,
    1280: 4,
    1024: 3,
    768: 2,
    640: 1,
  }

  if (displayAs === 'grid') {
    return (
      <div className="px-3 sm:px-4">
        <div className="flex justify-center sm:justify-start">
          <div className="w-60 sm:w-full">
            <Masonry
              breakpointCols={breakpointColumns}
              className="flex -ml-7"
              columnClassName="pl-3"
            >
              {items.map((item) => (
                <div key={item.id} className="mb-3">
                  <Card
                    collection={item}
                    title={item.nome}
                    media={item.copertina as Media | undefined}
                    slugUrl={`/${category}/${item.id}`}
                    category={category}
                    titlePosition={cardTitlePosition ?? 'top'}
                  />
                </div>
              ))}
            </Masonry>
          </div>
        </div>
      </div>
    )
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
            media={item.copertina as Media | undefined} // Changed from copertina to media based on types
            slugUrl={`/${category}/${item.id}`}
            category={category}
            titlePosition={cardTitlePosition ?? 'top'}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default MySwiper
