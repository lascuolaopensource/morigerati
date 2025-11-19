import { getDb } from '#/utils/server'
import { getLocale } from 'next-intl/server'

import { Copertina } from '@/modules/components/copertina'
import GridOverlay from '@/modules/components/grid-overlay'
import { Map } from '@/modules/components/map/map'
import { RichText } from '@/modules/components/richtext'
import { generateGlobalMetadataFactory } from '@/modules/seo'
import { getRelation, getRelations } from '@/modules/utils'

import { HomeSection } from './_partials/home-section'
import { RecordsDisplay } from './_partials/records-display'

//

export const dynamic = 'force-dynamic'

export const generateMetadata = generateGlobalMetadataFactory('home')

//

export default async function Page() {
	const locale = await getLocale()
	const db = await getDb()

	const home = await db.findGlobal({
		slug: 'home',
		locale: locale,
	})

	const { itinerari: itinerariSection, luoghi, residenze } = home.sections

	const itinerari = await db.find({
		collection: 'itinerari',
		select: {
			slug: true,
			gpx_track: true,
		},
	})

	const tracciati = itinerari.docs
		.map((i) => getRelation(i.gpx_track)?.url)
		.filter((v) => typeof v == 'string')

	return (
		<>
			<Copertina copertina={home.cover} title={home.statement} overlay={true}>
				<GridOverlay targetSquareSize={16} bottomDensity={1} effectRows={8} />
			</Copertina>

			<RichText
				data={home.introduzione}
				className="text-center mx-auto py-6 max-w-2xl text-balance"
			/>

			<HomeSection
				section="itinerari"
				title={itinerariSection.title}
				text={itinerariSection.description}
			>
				<Map gpxTracks={tracciati} />
			</HomeSection>

			<HomeSection
				section="luoghi"
				title={luoghi.title}
				text={luoghi.description}
				alignment="right"
			>
				<RecordsDisplay collection="luoghi" records={getRelations(home.sections.luoghi.items)} />
			</HomeSection>

			<HomeSection section="residenze" title={residenze.title} text={residenze.description}>
				<RecordsDisplay
					collection="residenze"
					records={getRelations(home.sections.residenze.items)}
				/>
			</HomeSection>
		</>
	)
}
