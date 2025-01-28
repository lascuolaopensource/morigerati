import { Media } from '@/payload-types'

export interface GalleriaProps {
  items: Media[] | undefined
  titleColor?: string
}

export interface MediaGalleryProps {
  items: Media[] | undefined
  initialIndex?: number
  onClose: () => void
}

export interface GalleryCardProps {
  media: Media
  height?: number
}
