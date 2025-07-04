import { CollectionConfig } from 'payload'
import { Collections } from '.'

export const Account: CollectionConfig = {
  slug: Collections.Account,
  labels: {
    singular: 'Account',
    plural: 'Accounts',
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'nome',
      type: 'text',
      required: true,
    },
    {
      name: 'persona',
      type: 'relationship',
      relationTo: Collections.Persone,
    },
  ],
}
