type GapProps = {
	size: number
}

export default function Gap({ size }: GapProps) {
	return (
		<div
			style={{
				paddingTop: `${size}px`,
			}}
		></div>
	)
}
