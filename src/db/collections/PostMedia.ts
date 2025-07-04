import type { CollectionConfig } from 'payload'
import { Collections } from '.'
import { imageSizes } from '../utils'

export const PostMedia: CollectionConfig = {
  slug: Collections.PostMedia,

  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      return user !== null
    },
  },

  upload: {
    disableLocalStorage: true,
    adminThumbnail: 'thumbnail',
    crop: true,
    focalPoint: true,

    formatOptions: { format: 'webp' },
    imageSizes,
  },
  fields: [],
}
