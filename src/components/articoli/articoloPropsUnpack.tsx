import { Articoli } from '@/payload-types'

const articoliUnpacker = (articolo: Articoli) => {
  const title = articolo.titolo
  const subtitle = 'sottotitolo'
  const imageUrl =
    typeof articolo.media === 'string'
      ? articolo.media
      : articolo.media?.url || 'METTERE QUI IL PLACEHOLDER'
  return { title, subtitle, imageUrl }
}

export default articoliUnpacker
