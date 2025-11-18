import { getTranslations } from 'next-intl/server'

import { CollectionPageHeading } from '@/modules/components/collection-page-heading'
import { Container } from '@/modules/components/container'
import { Copertina } from '@/modules/components/copertina'
import { Gallery } from '@/modules/components/gallery'
import { RichText } from '@/modules/components/richtext'
import { ServicesSection } from '@/modules/components/services-section'
import { getRecordBySlug, getSlug, PageWithSlugProps } from '@/modules/utils/server'

//

export const dynamic = 'force-dynamic'

export default async function Itinerario(pageProps: PageWithSlugProps) {
	const slug = await getSlug(pageProps)
	const { record: luogo } = await getRecordBySlug('luoghi', slug)

	const t = await getTranslations('luoghi')

	return (
		<>
			<Copertina copertina={luogo.copertina} collection="luoghi" />

			<CollectionPageHeading
				collection="luoghi"
				title={luogo.name}
				backButton={{
					href: '/luoghi',
					children: t('backButton'),
				}}
				// rightContent={
				// 	<Map gpxTracks={[gpxTrack]}>
				// 		<div className="absolute bottom-0 right-0 p-2 px-4 w-full">
				// 			<Button
				// 				href={gpxTrack ?? ''}
				// 				download
				// 				target="_blank"
				// 				className="bg-black text-white w-full"
				// 			>
				// 				{t('download_gpx')}
				// 			</Button>
				// 		</div>
				// 	</Map>
				// }
			/>

			<Container className="max-w-prose space-y-8">
				<RichText data={luogo.description} className="prose-h1:text-luoghi" />
				<ServicesSection services={luogo.services} collection="luoghi" />
			</Container>

			<Gallery items={luogo.gallery} collection="luoghi" />
		</>
	)
}

// TODO - Add media geolocalizzati

//   {/* TODO - Review this section */}
//   {/* Content below the two columns */}
//   {/* <div className="">
//   {itinerario?.persone && itinerario?.persone.length > 0 && (
//     <div className="">
//       <h2 className="font-bold text-xl text-center pb-4">{peopleTitle}</h2>
//       <CardGrid items={itinerario?.persone as Persone[]} category="persone" singleRow />
//     </div>
//   )}

//   {itinerario?.luoghi && itinerario?.luoghi.length > 0 && (
//     <div className="">
//       <h2 className="font-bold pt-4 text-xl text-center pb-4">{placesTitle}</h2>
//       <CardGrid items={itinerario?.luoghi as Luoghi[]} category="luoghi" singleRow />
//     </div>
//   )}
// </div> */}
