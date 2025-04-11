import type { CollectionConfig } from 'payload'

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
    },
  ],
  upload: {
    disableLocalStorage: true,
    adminThumbnail: 'thumbnail',
    crop: true,
    focalPoint: true,
    formatOptions: { format: 'webp' },
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        position: 'centre',
        fit: 'inside',
        formatOptions: { format: 'webp' },
      },
      {
        name: 'medium',
        width: 900,
        position: 'centre',
        fit: 'inside',
        formatOptions: { format: 'webp' },
      },
      {
        name: 'large',
        width: 1400,
        position: 'centre',
        fit: 'inside',
        formatOptions: { format: 'webp' },
      },
      {
        name: 'xlarge',
        width: 1920,
        position: 'centre',
        fit: 'inside',
        formatOptions: { format: 'webp' },
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
        position: 'centre',
        fit: 'inside',
        formatOptions: { format: 'webp' },
      },
    ],
  },
}
