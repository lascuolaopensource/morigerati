import { T } from '@/modules/components/t'
import { getRelation } from '@/modules/utils'
import { getDb } from '@/modules/utils/server'

import { Post } from './_partials/post'

//

export default async function Page() {
	const db = await getDb()

	const posts = await db.find({
		collection: 'social-post',
		sort: '-createdAt',
		depth: 2,
	})

	return (
		<div>
			<T tag="h1">Transluoghigram</T>
			<ul className="space-y-2">
				{posts.docs.map((post) => (
					<li key={post.id}>
						<Post post={post} owner={getRelation(post.owner)?.name ?? 'TR'} />
					</li>
				))}
			</ul>
		</div>
	)
}
