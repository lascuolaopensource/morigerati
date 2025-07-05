import { Entity } from '@/modules/types'

//

// TODO - Improve, add global handling and collection pages, that have no name
export function getPageTitle(doc: Partial<Entity>): string | undefined {
  let title: string | undefined
  if ('nome' in doc) {
    title = doc.nome as string
  } else if ('titolo' in doc) {
    title = doc.titolo as string
  }
  return title
}
