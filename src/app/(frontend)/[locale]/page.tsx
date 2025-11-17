// import Copertina from '#/components/uiElements/copertina'
// import GridOverlay from '#/components/uiElements/gridOverlay'

import { getDb } from '#/utils/server'
import { getLocale } from 'next-intl/server'

import { Copertina } from '@/modules/components/copertina'
import GridOverlay from '@/modules/components/grid-overlay'
import { Map } from '@/modules/components/map/map'
import { RichText } from '@/modules/components/richtext'
import { getRelations } from '@/modules/utils'

import { HomeSection } from './_partials/home-section'
import { RecordsDisplay } from './_partials/records-display'

//

export const dynamic = 'force-dynamic'

export default async function Page() {
	const locale = await getLocale()
	const db = await getDb()

	const home = await db.findGlobal({
		slug: 'home',
		locale: locale,
	})

	const { itinerari, luoghi, residenze } = home.sections

	// const tracciatiQuery = await db.find({
	//   collection: 'tracciati',
	// })

	// const trackColors = [
	//   '#FF5733', // Rosso-arancio
	//   '#33FF57', // Verde lime
	//   '#3357FF', // Blu
	//   '#FF33F6', // Rosa
	//   '#33FFF6', // Ciano
	//   '#F6FF33', // Giallo
	//   '#9933FF', // Viola
	//   '#FF8333', // Arancione
	//   '#33FF99', // Verde acqua
	//   '#FF3333', // Rosso
	// ]

	// const tracciati = tracciatiQuery.docs

	return (
		<>
			<Copertina copertina={home.cover} title={home.statement} overlay={true}>
				<GridOverlay targetSquareSize={16} bottomDensity={1} effectRows={8} />
			</Copertina>

			<RichText
				data={home.introduzione}
				className="text-center mx-auto py-6 max-w-2xl text-balance"
			/>

			<HomeSection section="itinerari" title={itinerari.title} text={itinerari.description}>
				<Map />
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

			{/* <div className="flex flex-col gap-4 items-center py-12 px-4 md:px-8">
        <h2 className="text-3xl text-center">{home.title}</h2>
        <RichText
          data={home.testo as SerializedEditorState}
          className="prose md:prose-lg text-center"
        />
      </div>



      <HomeCollection
        collection="itinerari"
        title={home.itinerari?.title} // Use optional chaining if structure might vary by locale
        text={home.itinerari?.testo as SerializedEditorState}
      >
        <div className="md:w-[400px] w-[calc(100vw-4rem)]">
          <HomeTracksSection tracciati={tracciati} />
        </div>
      </HomeCollection>

      <PixelBorder className="bg-luoghiColor" />

      <HomeCollection
        collection="luoghi"
        title={home.luoghi?.title}
        text={home.luoghi?.testo as SerializedEditorState}
        alignment="right"
      />

      <PixelBorder className="bg-residenzeColor" />

      <HomeCollection
        collection="residenze"
        title={home.residenze?.title}
        text={home.residenze?.testo as SerializedEditorState}
      /> */}
		</>
	)
}

// export async function generateMetadata(): Promise<Metadata> {
//   const { locale } = await load()

//   return createMetadata({
//     pathname: '/',
//     locale,
//   })
// }
