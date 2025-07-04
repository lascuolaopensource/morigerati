import { FormEvent } from 'react'
import { z } from 'zod/v4'

//

export async function handleCreatePost(e: FormEvent<HTMLFormElement>, apiUrl: string) {
  e.preventDefault()

  const formData = new FormData(e.currentTarget)

  const validationResult = schema.safeParse({
    text: formData.get('text'),
    link: formData.get('link'),
    media: formData.get('media'),
  })

  if (!validationResult.success) {
    return validationResult.error
  }

  const { text, link, media } = validationResult.data

  try {
    let mediaId: string | undefined
    if (media && media.size > 0 && media.name !== 'undefined') {
      const formData = new FormData()
      formData.append('file', media)

      const res = await fetch(`${apiUrl}/post-media`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })

      const data = (await res.json()) as { doc: { id: string } }
      mediaId = data.doc.id
    }

    await fetch(`${apiUrl}/post`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        link,
        media: mediaId,
      }),
    })
  } catch (error) {
    return error as Error
  }
}

const schema = z.object({
  text: z.string().trim(),
  link: z.url().trim().optional(),
  media: z.file().optional(),
})
