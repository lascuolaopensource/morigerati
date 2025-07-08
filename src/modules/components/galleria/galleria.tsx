'use client'

import React from 'react'
import { z } from 'zod'

import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

import { Photo, RowsPhotoAlbum } from 'react-photo-album'
import 'react-photo-album/rows.css'

import { Media } from '@/payload-types'
import { GalleryCardFactory } from './galleryCard'

//

interface GalleriaProps {
  items: Media[]
  cardClassName?: string
}

const Galleria: React.FC<GalleriaProps> = ({ items, cardClassName }) => {
  const [index, setIndex] = React.useState(-1)

  // TODO - Handle video
  // TODO - Handle placeholder (use thumbnailURL)

  const photos: Photo[] = items
    .map((item) => ({
      src: item.url,
      width: item.width,
      height: item.height,
    }))
    .filter(isPhoto)

  return (
    <>
      <RowsPhotoAlbum
        render={{
          image: GalleryCardFactory({ className: cardClassName }),
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

//

const photoSchema = z.object({
  src: z.string(),
  width: z.number(),
  height: z.number(),
})

function isPhoto(item: object): item is Photo {
  return photoSchema.safeParse(item).success
}
