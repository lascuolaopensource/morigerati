import { z } from 'zod/v4'
import { PostMedia } from '@/db/collections/PostMedia'
import { MAX_FILE_SIZE } from '@payload-config'

//

export const mimeTypes = PostMedia.upload.mimeTypes

const postSchema = z.object({
  text: z.string().trim(),
  link: z.nullish(z.url()),
  media: z.nullish(z.file().mime(mimeTypes).max(MAX_FILE_SIZE)),
})

export type Post = z.infer<typeof postSchema>

//

export async function handleCreatePost(formData: FormData, apiUrl: string) {
  const rawLink = formData.get('link')

  const validationResult = postSchema.safeParse({
    text: formData.get('text'),
    link: rawLink === '' ? null : rawLink,
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

//

export async function handleUpdatePost(formData: FormData, apiUrl: string, postId: string) {
  const rawLink = formData.get('link')

  const validationResult = postSchema.safeParse({
    text: formData.get('text'),
    link: rawLink === '' ? null : rawLink,
  })

  if (!validationResult.success) {
    return validationResult.error
  }

  const { text, link } = validationResult.data

  const body: Post = {
    text,
  }
  if (link) body.link = link

  try {
    await fetch(`${apiUrl}/post/${postId}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  } catch (error) {
    return error as Error
  }
}

export async function handleDeletePost(apiUrl: string, postId: string) {
  try {
    await fetch(`${apiUrl}/post/${postId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
  } catch (error) {
    return error as Error
  }
}
