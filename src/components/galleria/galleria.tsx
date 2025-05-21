'use client'

import React from 'react'

import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

import { Photo, RowsPhotoAlbum } from 'react-photo-album'
import 'react-photo-album/rows.css'

import { Media } from '@/payload-types'
import { GalleryCard } from './galleryCard'

//

export interface GalleriaProps {
  items: Media[]
  titleColor?: string
}

const Galleria: React.FC<GalleriaProps> = ({ items }) => {
  const [index, setIndex] = React.useState(-1)

  const photos: Photo[] = items.map((item) => ({
    src: item.url || '',
    width: item.width || 0,
    height: item.height || 0,
  }))

  return (
    <>
      <RowsPhotoAlbum
        render={{
          image: GalleryCard,
        }}
        photos={photos}
        targetRowHeight={150}
        onClick={({ index: current }) => setIndex(current)}
      />

      <Lightbox index={index} slides={photos} open={index >= 0} close={() => setIndex(-1)} />
    </>
  )
}

export default Galleria
