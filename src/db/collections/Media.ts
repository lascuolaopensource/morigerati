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
      localized: true,
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
        formatOptions: { format: 'webp', options: { quality: 90 } },
      },
      {
        name: 'small',
        width: 600,
        position: 'centre',
        fit: 'inside',
        formatOptions: { format: 'webp', options: { quality: 90 } },
        withoutEnlargement: true,
      },
      {
        name: 'medium',
        width: 900,
        position: 'centre',
        fit: 'inside',
        formatOptions: { format: 'webp', options: { quality: 90 } },
        withoutEnlargement: true,
      },
      {
        name: 'large',
        width: 1400,
        position: 'centre',
        fit: 'inside',
        formatOptions: { format: 'webp', options: { quality: 90 } },
        withoutEnlargement: true,
      },
      {
        name: 'xlarge',
        width: 1920,
        position: 'centre',
        fit: 'inside',
        formatOptions: { format: 'webp', options: { quality: 90 } },
        withoutEnlargement: true,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
        position: 'centre',
        fit: 'inside',
        formatOptions: { format: 'webp', options: { quality: 90 } },
        withoutEnlargement: true,
      },
      {
        name: 'full',
        formatOptions: { format: 'webp', options: { quality: 90 } },
      },
    ],
  },
}
