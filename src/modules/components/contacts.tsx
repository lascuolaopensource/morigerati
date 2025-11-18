//

import { ClassValue } from 'clsx'
import { useTranslations } from 'next-intl'

import { Luoghi, Persone } from '@/payload-types'

import { cn } from './shadcn/lib/utils'

//

type Contacts = NonNullable<Luoghi['contacts']> | NonNullable<Persone['contacts']>
type Contact = Contacts[number]

type Props = {
	contacts: Contacts
	className?: ClassValue
}

export function ContactList(props: Props) {
	const { contacts, className } = props
	const classes = cn('space-y-4', className)

	if (contacts.length === 0) return null
	console.log(contacts)

	return (
		<ul className={classes}>
			{contacts.map((contact, index) => (
				<li key={index}>
					<ContactCard contact={contact} />
				</li>
			))}
		</ul>
	)
}

//

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
