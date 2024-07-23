import type { GlobalConfig } from 'payload'
import * as F from '@/db/fields'
import { Globals } from '.'


export const Testi: GlobalConfig = {
  slug: Globals.Testi,
  access: {
    read: () => true,
  },
  fields: [
    ...F.titoloTesto('Corpo pagina "Luoghi"'),
    ...F.titoloTesto('Corpo pagina "Itinerari"'),
    ...F.titoloTesto('Corpo pagina "Residenze"'),
    ...F.titoloTesto('Corpo pagina "Stakeholders"'),
    ...F.titoloTesto('Corpo pagina "Articoli"'),
    ...F.titoloTesto('Corpo pagina "Programma culturale"'),
  ],
}
