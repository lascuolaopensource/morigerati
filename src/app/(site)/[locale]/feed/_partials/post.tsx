import { getMedia } from '@/modules/utils'
import { ImageWithFallback } from '@/modules/utils/imageWithFallback'
import { Post as PostType } from '@/payload-types'
import { formatDate } from 'date-fns'

//

type PostProps = {
  post: PostType
  owner: string
}

export function Post(props: PostProps) {
  const { post, owner } = props
  const media = getMedia(post.media)

  return (
    <div className="p-4 space-y-4 border rounded-md">
      <div className=" flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center overflow-hidden size-8 bg-itinerariColor rounded-sm">
            <p className="font-transluoghi text-[24px] block select-none text-center text-itinerarioColorScuro">
              {owner.slice(0, 2)}
            </p>
          </div>
          <p className=" text-black">{owner}</p>
        </div>

        <p className=" text-gray-300">{formatDate(post.updatedAt, 'dd/MM/yyyy')}</p>
      </div>

      {media?.url && (
        <ImageWithFallback
          src={media.url}
          alt="Post image"
          className="w-full aspect-square rounded-sm"
        />
      )}

      <div className="space-y-1">
        <p className="text-lg font-medium">{post.text}</p>
        {post.link && (
          <a
            className="text-blue-500 block hover:underline truncate"
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
