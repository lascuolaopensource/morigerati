import { Account, Config, Post, PostMedia } from '@/payload-types'
import { Luoghi, Persone, Itinerari, Residenze } from '@/payload-types'

//

export type CollectionName = keyof Omit<
  Config['collections'],
  | 'users'
  | 'media'
  | 'tracciati'
  | 'payload-locked-documents'
  | 'payload-preferences'
  | 'payload-migrations'
>
export type Collection = Config['collections'][CollectionName]

export type GlobalName = keyof Omit<Config['globals'], 'footer' | 'testi'>
export type Global = Config['globals'][GlobalName]

export type EntityName = CollectionName | GlobalName
export type Entity = Exclude<Collection, Post | Account | PostMedia> | Global

//

export type MainCollections = 'luoghi' | 'itinerari' | 'residenze' | 'persone'

export type MainCollectionRecord = Luoghi | Persone | Itinerari | Residenze
