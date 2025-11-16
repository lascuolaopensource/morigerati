import { getRandomItem } from '../utils'

const sections = ['luoghi', 'itinerari', 'persone', 'residenze', 'default'] as const

export type Section = (typeof sections)[number]

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
	default: {
		className: 'bg-white text-black',
		invertedClassName: 'text-black bg-white',
		borderClassName: 'border-black',
	},
}

export function getSectionDisplayData(section: Section): SectionDisplayData {
	return sectionDisplayData[section]
}

export function isSection(section: string): section is Section {
	return sections.includes(section as Section)
}

export function pathnameToSection(pathname: string): Section {
	console.log(pathname)
	return sections.find((section) => pathname.includes(section)) ?? 'default'
}

export function getRandomDisplayData(): SectionDisplayData {
	return getSectionDisplayData(getRandomItem(sections.filter((section) => section !== 'default')))
}
