import { getLocale } from '@/modules/i18n'
import { redirect } from '@/modules/i18n/routing'
import { loadDb } from '@/modules/utils/db'
import { headers } from 'next/headers'
import { CreatePostForm } from './create-post-form'

//

export default async function Page() {
  const payload = await loadDb()

  const { user } = await payload.auth({
    headers: await headers(),
  })

  if (!user || user.collection !== 'account') {
    redirect({
      href: '/account/login',
      locale: await getLocale(),
    })
    return null
  }

  const posts = await payload.find({
    collection: 'post',
    where: {
      owner: {
        equals: user.id,
      },
    },
  })

  const apiUrl = payload.getAPIURL()

  return (
    <div>
      <h1>Posts</h1>
      <CreatePostForm apiUrl={apiUrl} />
      <ul>
        {posts.docs.map((post) => (
          <li key={post.id}>
            {post.text}
            {post.media && <img src={post.media.url} alt={post.media.alt} />}
          </li>
        ))}
      </ul>
    </div>
  )
}
