import type { Media } from '@/payload-types'

export interface MediaGalleryProps {
  items: Media[]
  initialIndex: number
  onClose: () => void
}
