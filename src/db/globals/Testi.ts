import type { GlobalConfig } from 'payload'
import * as F from '@/fields'
import { Globals } from '.'

export const Testi: GlobalConfig = {
  slug: Globals.Testi,

  access: {
    read: () => true,
  },

  fields: [
    F.titleAndText('luoghi', 'Introduzione pagina "Luoghi"'),
    F.titleAndText('itinerari', 'Introduzione pagina "Itinerari"'),
    F.titleAndText('residenze', 'Introduzione pagina "Residenze"'),
    F.titleAndText('stakeholders', 'Introduzione pagina "Persone"'),
    F.titleAndText('articoli', 'Introduzione pagina "Articoli"'),
  ],
}
