import { CollectionSlug, DataFromCollectionSlug } from 'payload'

import { getRandomItem } from '../utils'

//

export const MAIN_COLLECTIONS = [
	'luoghi',
	'itinerari',
	'persone',
	'residenze',
	'articoli',
] as const satisfies CollectionSlug[]

export type MainCollection = (typeof MAIN_COLLECTIONS)[number]

export type MainCollectionRecord = DataFromCollectionSlug<MainCollection>

//

export type Section = MainCollection | 'default'

type SectionDisplayData = {
	className: string
	invertedClassName: string
	borderClassName: string
}

const sectionDisplayData: Record<Section, SectionDisplayData> = {
	luoghi: {
		className: 'bg-luoghi text-black',
		invertedClassName: 'text-luoghi bg-white',
		borderClassName: 'border-luoghi',
	},
	itinerari: {
		className: 'bg-itinerari text-black',
		invertedClassName: 'text-itinerari bg-white',
		borderClassName: 'border-itinerari',
	},
	persone: {
		className: 'bg-persone text-black',
		invertedClassName: 'text-persone bg-white',
		borderClassName: 'border-persone',
	},
	residenze: {
		className: 'bg-residenze text-black',
		invertedClassName: 'text-residenze bg-white',
		borderClassName: 'border-residenze',
	},
	articoli: {
		className: 'bg-articoli text-black',
		invertedClassName: 'text-articoli bg-white',
		borderClassName: 'border-articoli',
	},
	default: {
		className: 'bg-white text-black',
		invertedClassName: 'text-black bg-white',
		borderClassName: 'border-black',
	},
}

export function getSectionDisplayData(section: Section | undefined): SectionDisplayData {
	return sectionDisplayData[section ?? 'default']
}

export function isSection(section: string): section is Section {
	return section === 'default' || MAIN_COLLECTIONS.includes(section as MainCollection)
}

export function pathnameToSection(pathname: string): Section {
	return MAIN_COLLECTIONS.find((section) => pathname.includes(section)) ?? 'default'
}

export function getRandomDisplayData(): SectionDisplayData {
	return getSectionDisplayData(getRandomItem(MAIN_COLLECTIONS))
}
