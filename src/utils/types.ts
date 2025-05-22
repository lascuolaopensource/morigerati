import { Luoghi, Persone, Itinerari, Residenze } from '@/payload-types'

export type MainCollections = 'luoghi' | 'itinerari' | 'residenze' | 'persone'

export type MainCollectionRecord = Luoghi | Persone | Itinerari | Residenze
