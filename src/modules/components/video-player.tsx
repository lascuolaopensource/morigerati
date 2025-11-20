//

import { DetailedHTMLProps, VideoHTMLAttributes } from 'react'

type VideoProps = DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>

type Props = VideoProps & {
	url?: string
}

export function VideoPlayer(props: Props) {
	const { url, ...restProps } = props

	if (!url) return null

	return (
		<video
			className="w-full rounded-md overflow-hidden border-2 border-black"
			playsInline
			controls={true}
			{...restProps}
		>
			<source src={url} />
		</video>
	)
}
