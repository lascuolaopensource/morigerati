import { Video as VideoType } from '@/payload-types'

import { getRelation, Optional, Relation } from '../utils'
import { VideoPlayer } from './video-player'

//

type Props = {
	video: Optional<Relation<VideoType>>
}

export function Video(props: Props) {
	const { video } = props

	const record = getRelation(video)
	if (!record || !record.url) return null

	return <VideoPlayer url={record.url} />
}
