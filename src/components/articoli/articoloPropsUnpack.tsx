import { Articoli } from '@/payload-types'

const articoliUnpacker = (articolo: Articoli) => {
  const title = articolo.titolo
  const subtitle = 'sottotitolo'
  const imageUrl =
    typeof articolo.copertina === 'string'
      ? articolo.copertina
      : articolo.copertina?.url || 'METTERE QUI IL PLACEHOLDER'
  const slugUrl = articolo.id
  const tags = articolo.tags?.map((tag) => tag.tag) ?? []
  return { title, subtitle, imageUrl, slugUrl, tags }
}

export default articoliUnpacker
