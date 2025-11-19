import { ArrowRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { CollectionPageHeading } from '@/modules/components/collection-page-heading'
import { Container } from '@/modules/components/container'
import { Copertina } from '@/modules/components/copertina'
import { InfoSection } from '@/modules/components/info-section'
import { RichText } from '@/modules/components/richtext'
import { T } from '@/modules/components/t'
import { formatDate } from '@/modules/utils'
import { getRecordBySlug, getSlug, PageWithSlugProps } from '@/modules/utils/server'

import { ProgrammaResidenza } from './_partials/programma-residenza'

//

export const dynamic = 'force-dynamic'

export default async function ResidenzaSlug(props: PageWithSlugProps) {
	const slug = await getSlug(props)
	const { record: residenza } = await getRecordBySlug('residenze', slug)
	const t = await getTranslations('residenze')

	// const { data_inizio, deadline_iscrizione, link_iscrizione, mostra_pulsante_iscrizione } =
	//   residenza

	// const messages = await getMessages()
	// const state = getResidenzaState(residenza)

	const startDate = formatDate(residenza.start_date)
	const endDate = residenza.end_date ? formatDate(residenza.end_date) : undefined

	return (
		<div>
			<Copertina copertina={residenza.copertina} collection="residenze" />
			<CollectionPageHeading
				title={residenza.name}
				collection="residenze"
				backButton={{
					href: '/residenze',
					children: t('backButton'),
				}}
				// rightContent={
				//   state != 'started' && (
				//     <div className="grow w-full space-y-6">
				//       <InfoResidenza residenza={residenza} />
				//     </div>
				//   )
				// }
			>
				<T tag="h3" className="text-white -mt-3">
					{residenza.short_description}
				</T>
				<div className="flex gap-2 items-center">
					<span>{startDate}</span>
					{endDate && (
						<>
							<ArrowRight size={16} className="-translate-y-px" />
							<span>{endDate}</span>
						</>
					)}
				</div>
			</CollectionPageHeading>

			<Container className="max-w-prose">
				{residenza.description && (
					<InfoSection title={t('description')} collection="residenze">
						<RichText data={residenza.description} />
					</InfoSection>
				)}

				{residenza.program && (
					<InfoSection title={t('program')} collection="residenze">
						<ProgrammaResidenza program={residenza.program} />
					</InfoSection>
				)}
			</Container>

			{/*
      <DetailPageHeading
        title={residenza.nome}
        collection="residenze"
        backButton={{
          message: messages.backButton.residenze,
          href: '/residenze',
        }}

      >

        )}
      </DetailPageHeading>


      <Container className="flex flex-col items-center max-w-prose space-y-8">
        {residenza.descrizione && (
          <div className="space-y-4">
            <SectionTitle color="residenze">{messages.residenze.description}</SectionTitle>
            <RichText
              data={residenza.descrizione}
              className="prose prose-lg text-left"
              disableTextAlign={true}
            />
          </div>
        )}

        {residenza.programma?.length && (
          <div className="">
            <SectionTitle color="residenze" className="border-none">
              {messages.residenze.program}
            </SectionTitle>
            <ProgrammaList residenza={residenza} noDetailsText={messages.residenze.noDetails} />
          </div>
        )}

        {residenza.esperti?.length && (
          <div className="space-y-4">
            <SectionTitle color="residenze">{messages.residenze.experts}</SectionTitle>
            <div className="space-y-2">
              {residenza.esperti?.map((esperto, index) => (
                <TutorCard
                  key={index}
                  esperto={esperto}
                  translations={{
                    projects: messages.residenze.projects,
                    organizations: messages.residenze.organizations,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </Container>

      <PixelBorder className="bg-residenzeColor" />
      <div className="bg-residenzeColor">
        <Container>
          {residenza.galleria && <Galleria items={residenza.galleria as Media[]} />}
        </Container>
      </div> */}
		</div>
	)
}
