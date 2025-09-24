import { getMedia } from '#/utils'
import { ImageWithFallback } from '#/utils/imageWithFallback'
import { cn } from '#/utils/utils'
import { Post as PostType } from '@/payload-types'
import { formatDate } from 'date-fns'

//

type PostProps = {
  post: PostType
  owner: string
  size?: 'sm' | 'md'
}

export function Post(props: PostProps) {
  const { post, owner, size = 'md' } = props
  const media = getMedia(post.media)

  return (
    <div className={cn('border rounded-md', size === 'sm' ? 'p-3 space-y-3' : 'p-4 space-y-4')}>
      <div className=" flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              'flex items-center justify-center overflow-hidden size-8 bg-itinerariColor rounded-sm',
              size === 'sm' && 'scale-80',
            )}
          >
            <p className="font-transluoghi text-[24px] block select-none text-center text-itinerarioColorScuro">
              {owner.slice(0, 2)}
            </p>
          </div>
          <p className={cn('text-black', size === 'sm' ? 'text-sm' : 'text-md')}>{owner}</p>
        </div>

        <p className={cn('text-gray-300', size === 'sm' ? 'text-sm' : 'text-md')}>
          {formatDate(post.updatedAt, 'dd/MM/yyyy')}
        </p>
      </div>

      {media?.url && (
        <ImageWithFallback
          src={media.url}
          alt="Post image"
          className="w-full aspect-square rounded-sm"
        />
      )}

      <div className="space-y-1">
        <p className={cn('font-medium', size === 'sm' ? 'text-md' : 'text-lg')}>{post.text}</p>
        {post.link && (
          <a
            className={cn(
              'text-blue-500 block hover:underline truncate',
              size === 'sm' ? 'text-sm' : 'text-md',
            )}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {post.link}
          </a>
        )}
      </div>
    </div>
  )
}
