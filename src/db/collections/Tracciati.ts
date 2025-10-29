import type { CollectionConfig } from 'payload'

export const Tracciati: CollectionConfig = {
  slug: 'tracciati',
  labels: {
    singular: 'Tracciato',
    plural: 'Tracciati',
  },
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
    staticDir: 'data/tracciati',
  },
}
