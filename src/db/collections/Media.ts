import type { CollectionConfig } from 'payload'
import { imageSizes } from '../utils'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
    },
  ],

  upload: {
    disableLocalStorage: true,
    adminThumbnail: 'thumbnail',
    crop: true,
    focalPoint: true,

    formatOptions: { format: 'webp' },
    imageSizes,
  },
}
