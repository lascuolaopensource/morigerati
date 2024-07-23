import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import ColorCardWrapper from '@/components/colorCardWrapper'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import renderContent from '@/utils/renderElement'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const StakeholdersPage = async () => {
  const db = await loadDb()

  const stakeholder = await db.find({
    collection: 'stakeholders',
  })

  const stakeholderData = stakeholder.docs[0]

  return (
    <main className="mx-auto max-w-xl">
      <Navbar backgroundColor="bg-stakeholderColor" currentPage="/stakeholders" />
      <div className="bg-white p-3 pt-5">
        <h1 className="font-bold text-[40px]">Stakeholders</h1>
        {/*         {stakeholdersTesto ? (
          <div className="font-normal text-sm pt-4 pb-4 leading-4">
            {renderElement([{ children: stakeholdersTesto }])}
          </div>
        ) : (
          <p>Error loading Stakeholders text data</p>
        )} */}
        <Suspense fallback={<div>Loading Stakeholders component...</div>}>
          {/*           <ColorCardWrapper
            color="bg-stakeholderColor"
            jsonString={JSON.stringify(collectionStakeholders)}
            previous="stakeholders"
          /> */}
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer />
      </Suspense>
    </main>
  )
}

export default StakeholdersPage
