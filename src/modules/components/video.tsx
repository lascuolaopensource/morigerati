import { Video as VideoType } from '@/payload-types'

import { getRelation, Optional, Relation } from '../utils'

//

type Props = {
	video: Optional<Relation<VideoType>>
}

export function Video(props: Props) {
	const { video } = props

	const record = getRelation(video)
	if (!record || !record.url) return null

	return (
		<video
			className="w-full rounded-md overflow-hidden border-2 border-black"
			playsInline
			controls={true}
		>
			<source src={record.url} />
		</video>
	)
}
