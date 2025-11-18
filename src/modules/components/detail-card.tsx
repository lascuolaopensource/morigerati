import { RandomLetter } from '@/modules/components/random-letter'

type Props = {
	label?: string
	value?: string | null | undefined
	children?: React.ReactNode
	layout?: 'left' | 'center'
}

export function DetailCard(props: Props) {
	const { label, value, children } = props

	return (
		<div className="bg-white/20 rounded-md py-2 px-3 text-black relative overflow-hidden">
			<RandomLetter className="absolute top-0 right-0 text-white/30 z-0" size={70} />

			<div className="relative space-y-1 z-1">
				{label && (
					<p className="text-xs uppercase font-semibold tracking-wider text-black/60">{label}</p>
				)}
				<p className="text-xl wrap-break-word overflow-hidden">{value ?? 'N/A'}</p>
				{children}
			</div>
		</div>
	)
}
