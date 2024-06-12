import type { CollectionConfig } from 'payload/types';

export const Call: CollectionConfig = {
  slug: 'call',
  admin: {
    useAsTitle: 'nome',
  },
  fields: [
    {
    name: 'nome',
    type: 'text',
    required: true,
    },
    {
      name: 'abstract',
      type: 'textarea',
      required: true,
    },
    {
      name: 'programma',
      type: 'textarea',
    },
    {
      name: 'figure_richieste',
      type: 'array',
      fields: [
        {
          name: 'nome',
          type: 'text',
          required: true,
        },
        {
          name: 'descrizione',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'info_logistiche',
      type: 'textarea',
    },
    {
      name: 'profili_tutor_ed_esperti',
      type: 'array',
      fields: [
        {
          name: 'nome',
          type: 'text',
          required: true,
        },
        {
          name: 'profilo',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'date_residenza_deadline',
      type: 'date',
    },
    {
      name: 'google_form_iscrizione',
      type: 'text',
    },
    {
      name: 'grafiche_open_call',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
    },
  ],
};

export default Call;
