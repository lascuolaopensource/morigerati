type Props = {
	children: React.ReactNode
}

export function Grid(props: Props) {
	const { children } = props

	return <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{children}</div>
}
