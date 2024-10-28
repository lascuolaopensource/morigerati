import { Articoli, Media } from '@/payload-types'

const articoliUnpacker = (articolo: Articoli) => {
  const title = articolo.titolo
  const subtitle = articolo.sottotitolo ? articolo.sottotitolo : ''
  const media = articolo.copertina as Media | undefined
  const slugUrl = articolo.id
  const tags = articolo.tags?.map((tag) => tag.tag) ?? []
  return { title, subtitle, media, slugUrl, tags }
}

export default articoliUnpacker
