import { Config } from '@/payload-types'
import { Luoghi, Persone, Itinerari, Residenze } from '@/payload-types'

//

export type CollectionName = keyof Omit<
  Config['collections'],
  | 'users'
  | 'media'
  | 'tracciati'
  | 'post'
  | 'account'
  | 'post-media'
  | 'payload-locked-documents'
  | 'payload-preferences'
  | 'payload-migrations'
>
export type Collection = Config['collections'][CollectionName]

export type GlobalName = keyof Omit<Config['globals'], 'footer' | 'testi'>
export type Global = Config['globals'][GlobalName]

export type EntityName = CollectionName | GlobalName
export type Entity = Collection | Global

//

export type MainCollections = 'luoghi' | 'itinerari' | 'residenze' | 'persone'

export type MainCollectionRecord = Luoghi | Persone | Itinerari | Residenze
