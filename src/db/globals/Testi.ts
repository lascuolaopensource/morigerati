import type { GlobalConfig } from 'payload'
import { titoloTesto } from '@/db/fields'
import { Globals } from '.'

export const Testi: GlobalConfig = {
  slug: Globals.Testi,
  access: {
    read: () => true,
  },
  fields: [
    ...titoloTesto('Luoghi'),
    ...titoloTesto('Itinerari'),
    ...titoloTesto('Residenze'),
    ...titoloTesto('Stakeholders'),
    ...titoloTesto('Articoli'),
    ...titoloTesto('Programma culturale'),
  ],
}
