import { SquareArrowOutUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { InfoSection } from '@/modules/components/info-section'
import { MediaWithFallback } from '@/modules/components/media-with-fallback'
import { ReadMoreByHeight } from '@/modules/components/read-more-by-height'
import { RichText } from '@/modules/components/richtext'
import { Badge } from '@/modules/components/shadcn/components/ui/badge'
import { Link } from '@/modules/i18n'
import { Residenze } from '@/payload-types'

//

type PersoneResidenza = Residenze['people']

export function PersoneSection(props: { people: PersoneResidenza }) {
	const { people } = props
	const t = useTranslations('residenze')

	if (!people || people.length === 0) return null

	return (
		<InfoSection title={t('people')} collection="residenze">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{people.map((person) => (
					<PersonaCard key={person.id} person={person} />
				))}
			</div>
		</InfoSection>
	)
}

//

interface PersonaCardProps {
	person: NonNullable<PersoneResidenza>[number]
}

function PersonaCard(props: PersonaCardProps) {
	const { person } = props

	return (
		<div className="bg-residenze/20 overflow-hidden rounded-md p-4 space-y-4">
			<div className="flex items-center gap-4">
				<MediaWithFallback
					media={person.foto}
					className="size-20 rounded-md shrink-0 bg-residenze/30"
				/>
				<div className="space-y-2">
					<div className="-space-y-1">
						<h3 className="font-bold text-lg">{person.name}</h3>
						{person.role && <p className="text-residenze font-medium">{person.role}</p>}
					</div>
					<OrganizationsList organizations={person.organizations} />
				</div>
			</div>

			{person.bio && (
				<ReadMoreByHeight>
					<RichText data={person.bio} className="prose-sm" />
				</ReadMoreByHeight>
			)}
		</div>
	)
}

//

type Organizations = NonNullable<PersoneResidenza>[number]['organizations']
type Organization = NonNullable<Organizations>[number]

function OrganizationBadge(props: { organization: Organization }) {
	const { organization } = props

	if (organization.url) {
		return (
			<Badge key={organization.id} asChild>
				<Link href={organization.url} target="_blank">
					{organization.name}
					<SquareArrowOutUpRight size={12} />
				</Link>
			</Badge>
		)
	}
	return <Badge key={organization.id}>{organization.name}</Badge>
}

function OrganizationsList(props: { organizations: Organizations }) {
	const { organizations } = props
	if (!organizations || organizations.length === 0) return null

	return (
		<div className="flex flex-col gap-0.5">
			{organizations.map((organization) => (
				<OrganizationBadge key={organization.id} organization={organization} />
			))}
		</div>
	)
}
