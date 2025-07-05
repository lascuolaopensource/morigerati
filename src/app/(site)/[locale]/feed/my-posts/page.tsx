import { getLocale } from '@/modules/i18n'
import { redirect } from '@/modules/i18n/routing'
import { loadDb } from '@/modules/utils/db'
import { headers } from 'next/headers'
import { AlertCircleIcon, PencilIcon, TrashIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DeletePost, PostForm } from './_partials/post-form'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Post } from '../_partials/post'

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
    <div className="">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <div>
          <p>{user.nome}</p>
          <h1 className="text-3xl font-bold">I tuoi post</h1>{' '}
        </div>

        <PostForm apiUrl={apiUrl} sheetTrigger={<Button>Crea post</Button>} />
      </div>

      <ul className="space-y-4">
        {posts.docs.map((post) => (
          <li key={post.id} className="relative group">
            <Post post={post} owner={user.nome} />

            <div className="hidden absolute top-2 right-2 bg-white border rounded-md p-1 group-hover:flex items-center gap-1">
              <PostForm
                apiUrl={apiUrl}
                sheetTrigger={
                  <Button variant="ghost" size="icon">
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                }
                postId={post.id}
                initialValues={post}
              />

              <DeletePost
                apiUrl={apiUrl}
                postId={post.id}
                sheetTrigger={
                  <Button variant="ghost" size="icon">
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                }
              >
                <Alert variant="destructive">
                  <AlertCircleIcon size={16} />
                  <AlertTitle>Attenzione!</AlertTitle>
                  <AlertDescription>Sei sicuro di voler eliminare questo post?</AlertDescription>
                </Alert>
              </DeletePost>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
