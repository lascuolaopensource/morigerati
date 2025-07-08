import { loadDb } from '#/utils/db'
import { Post } from './_partials/post'
import { Account } from '@/payload-types'

export default async function Page() {
  const db = await loadDb()

  const posts = await db.find({
    collection: 'post',
    sort: '-createdAt',
    depth: 2,
  })

  return (
    <div>
      <ul className="space-y-2">
        {posts.docs.map((post) => (
          <li key={post.id}>
            <Post post={post} owner={(post.owner as Account).nome} />
          </li>
        ))}
      </ul>
    </div>
  )
}
