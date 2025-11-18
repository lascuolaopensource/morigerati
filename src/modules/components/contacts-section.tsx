//

import { ClassValue } from 'clsx'
import { useTranslations } from 'next-intl'

import { Luoghi, Persone } from '@/payload-types'

import { MainCollection } from '../brand'
import { InfoSection } from './info-section'
import { cn } from './shadcn/lib/utils'

//

type Contacts = Luoghi['contacts'] | Persone['contacts']

type Props = {
	contacts: Contacts
	className?: ClassValue
	collection: MainCollection
}

export function ContactsSection(props: Props) {
	const { contacts, className, collection } = props

	const t = useTranslations('common')
	const classes = cn('space-y-4', className)

	if (!contacts || contacts.length === 0) return null

	return (
		<InfoSection collection={collection} title={t('contacts')} className={classes}>
			<ul className={classes}>
				{contacts.map((contact, index) => (
					<li key={index}>
						<ContactCard contact={contact} />
					</li>
				))}
			</ul>
		</InfoSection>
	)
}

//

type Contact = NonNullable<Contacts>[number]

function ContactCard({ contact }: { contact: Contact }) {
	const t = useTranslations('common')
	return (
		<div>
			<p className="font-medium">{contact.name}</p>
			<ContactItem label={t('phone')} value={contact.telefono} mode="tel" />
			<ContactItem label={t('email')} value={contact.email} mode="email" />
			<ContactItem label={t('link')} value={contact.url} mode="url" />
		</div>
	)
}

//

type ContactKind = 'email' | 'tel' | 'url'

type ContactItemProps = {
	label: string
	mode: ContactKind
	value?: string | null | undefined
}

function ContactItem(props: ContactItemProps) {
	const { label, value, mode } = props
	if (!value) return null

	const schemes: Record<ContactKind, string> = {
		email: `mailto:${value}`,
		tel: `tel:${value}`,
		url: value,
	}

	return (
		<p className="text-sm">
			<span className="pr-1">{label}:</span>
			<a
				href={schemes[mode]}
				{...(mode === 'url' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
				className={cn('text-blue-600 hover:underline', mode == 'url' && 'truncate')}
			>
				{value}
			</a>
		</p>
	)
}
