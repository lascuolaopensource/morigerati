import { getLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { Button } from '@/modules/components/button'
import { CollectionPageHeading } from '@/modules/components/collection-page-heading'
import { Container } from '@/modules/components/container'
import { Copertina } from '@/modules/components/copertina'
import { Map } from '@/modules/components/map/map'
import { RichText } from '@/modules/components/richtext'
import { ServicesSection } from '@/modules/components/services-section'
import { getMediaRecords, getRelation } from '@/modules/utils'
import { getDb } from '@/modules/utils/server'

import { ItinerarioDetailCards } from './_partials'

//

export const dynamic = 'force-dynamic'

interface PageProps {
	params: Promise<{
		slug: string
	}>
}

export default async function Itinerario(pageProps: PageProps) {
	const db = await getDb()
	const locale = await getLocale()
	const t = await getTranslations('itineraries')
	const slug = (await pageProps.params).slug

	const { docs: itinerari } = await db.find({
		collection: 'itinerari',
		depth: 2,
		locale,
		where: { slug: { equals: slug } },
	})

	const itinerario = itinerari.at(0)
	if (!itinerario) notFound()

	const gallery = getMediaRecords(itinerario.gallery)
	const gpxTrack = getRelation(itinerario.gpx_track)?.url

	return (
		<>
			<Copertina copertina={itinerario.copertina} />

			<CollectionPageHeading
				collection="itinerari"
				title={itinerario.name}
				backButton={{
					href: '/itinerari',
					children: t('backButton'),
				}}
				rightContent={
					<Map gpxTracks={[gpxTrack]}>
						<div className="absolute bottom-0 right-0 p-2 px-4 w-full">
							<Button
								href={gpxTrack ?? ''}
								download
								target="_blank"
								className="bg-black text-white w-full"
							>
								{t('download_gpx')}
							</Button>
						</div>
					</Map>
				}
			>
				<ItinerarioDetailCards itinerario={itinerario} />
			</CollectionPageHeading>

			<Container className="max-w-prose space-y-8">
				<RichText data={itinerario.description} className="prose-h1:text-itinerari" />
				<ServicesSection services={itinerario.services} collection="itinerari" />
			</Container>

			{/*

      <Container className="max-w-prose space-y-8">
        {itinerario?.Video && (
          <div className="rounded-md overflow-hidden">
            <MediaViewer media={itinerario.Video as Media} />
          </div>
        )}

        <RichText data={itinerario.testo as SerializedEditorState} className="prose md:prose-lg" />

        <ServiziSection servizi={itinerario.servizi} collection="itinerari" />


      </Container>

      <div>
        <PixelBorder className="bg-itinerariColor" />
        <div className="bg-itinerariColor">
          <Container className="space-y-6">
            <p className="text-center text-3xl font-bold text-white">Scopri il percorso!</p>
            <div className="h-[600px]">
              <DynamicMappa
                initialPosition={position}
                initialZoom={14}
                gpxUrl={getTracciatoUrl(itinerario.tracciato_gpx)}
                localizedMedia={itinerario.media_geolocalizzati}
              />
            </div>

            {galleryItems.length > 0 && <Galleria items={galleryItems} />}
          </Container>
        </div>
      </div> */}
		</>
	)
}

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
