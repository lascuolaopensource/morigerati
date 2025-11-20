import type { SocialPost } from '@/payload-types'

import { imageMimeTypes, videoMimeTypes } from '@/db/utils'
import { ImageWithFallback } from '@/modules/components/image-with-fallback'
import { cn } from '@/modules/components/shadcn/lib/utils'
import { VideoPlayer } from '@/modules/components/video-player'
import { formatDate, getRelation } from '@/modules/utils'

//

type PostProps = {
	post: SocialPost
	owner: string
	size?: 'sm' | 'md'
}

export function Post(props: PostProps) {
	const { post, owner, size = 'md' } = props
	const media = getRelation(post.media)

	const isVideo = videoMimeTypes.includes(media?.mimeType ?? '')
	const isImage = imageMimeTypes.includes(media?.mimeType ?? '')

	return (
		<div className={cn('border rounded-md', size === 'sm' ? 'p-3 space-y-3' : 'p-4 space-y-4')}>
			<div className=" flex items-center justify-between gap-2">
				<div className="flex items-center gap-2">
					<div
						className={cn(
							'flex items-center justify-center overflow-hidden size-8 bg-itinerari rounded-sm',
							size === 'sm' && 'scale-80',
						)}
					>
						<p className="font-transluoghi-pixels text-[24px] block select-none text-center text-itinerari-dark">
							{owner.slice(0, 2)}
						</p>
					</div>
					<p className={cn('text-black', size === 'sm' ? 'text-sm' : 'text-md')}>{owner}</p>
				</div>

				<p className={cn('text-gray-300', size === 'sm' ? 'text-sm' : 'text-md')}>
					{formatDate(post.updatedAt)}
				</p>
			</div>

			{media?.url && isImage && (
				<ImageWithFallback
					src={media.url}
					alt="Post image"
					className="w-full aspect-square rounded-sm"
				/>
			)}

			{media?.url && isVideo && <VideoPlayer url={media.url} />}

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
