import { Media } from '@/payload-types'

export interface GalleriaProps {
  items: Media[]
  titleColor?: string
}

export interface MediaGalleryProps {
  items: Media[]
  initialIndex: number
  onClose: () => void
}
