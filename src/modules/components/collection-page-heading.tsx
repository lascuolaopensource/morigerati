import { getSectionDisplayData, MainCollection } from '../brand'
import { LinkProps } from '../utils'
import { BackButton } from './back-button'
import { Container } from './container'
import { PixelBorder } from './pixel-border'

//

type Props = {
	collection: MainCollection
	backButton: LinkProps
	title: string
	children?: React.ReactNode
	rightContent?: React.ReactNode
}

export function CollectionPageHeading(props: Props) {
	const { collection, backButton, title, children, rightContent } = props
	const { className } = getSectionDisplayData(collection)

	return (
		<>
			<div className={className}>
				<Container className="flex flex-col justify-between sm:flex-row sm:items-center gap-4 sm:gap-8 py-8">
					<div className="space-y-4 grow basis-1">
						<BackButton {...backButton} />
						<h1 className="text-4xl text-white font-bold text-balance">{title}</h1>
						{children}
					</div>

					{rightContent && <div className="grow basis-1">{rightContent}</div>}
				</Container>
			</div>

			<PixelBorder className={className} />
		</>
	)
}
