'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Polaroid from './polaroid'

interface SwiperProps {
  json: string
  color: string
}

interface MediaItem {
  url: string
}

interface DocItem {
  id: string
  nome: string
  media?: MediaItem
  call_media?: MediaItem
  Output?: {
    output: {
      media: MediaItem | null
    }
  }
}

interface JsonData {
  docs?: DocItem[]
}

const MySwiper: React.FC<SwiperProps> = ({ json, color }) => {
  const data: JsonData = JSON.parse(json)

  const getImageUrl = (doc: DocItem): string => {
    if (doc.media?.url) {
      return doc.media.url
    } else if (doc.call_media?.url) {
      return doc.call_media.url
    } else if (doc.Output?.output.media?.url) {
      return doc.Output.output.media.url
    }
    return ''
  }

  const createPolaroid = (doc: DocItem) => (
    <SwiperSlide key={doc.id}>
      <Polaroid color={color} title={doc.nome} imageUrl={getImageUrl(doc)} />
    </SwiperSlide>
  )

  const documents = data.docs || [data as DocItem]

  return (
    <Swiper slidesPerView={2} spaceBetween={40}>
      {documents.map(createPolaroid)}
    </Swiper>
  )
}

export default MySwiper
