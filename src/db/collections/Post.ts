import { CollectionConfig } from 'payload'
import { Collections } from '.'

export const Post: CollectionConfig = {
  slug: Collections.Post,
  access: {
    read: () => true,
    create: ({ req: { user } }) => user !== null,
  },

  labels: {
    singular: 'Post',
    plural: 'Posts',
  },
  admin: {
    useAsTitle: 'text',
  },
  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
    },
    {
      name: 'link',
      type: 'text',
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'post-media',
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'account',
      required: true,
      hooks: {
        beforeValidate: [
          ({ value, req }) => {
            console.log(value, req.user)
            if (value && req.user?.collection == 'users') {
              return value
            } else if (req.user?.collection == 'account') {
              return req.user?.id
            }
            throw new Error('Unexpected error')
          },
        ],
      },
    },
  ],
}
