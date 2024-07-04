import { Suspense } from 'react'

import { findCollection, findGlobals } from '@/utils/fetch'
import Footer from '../../components/footer'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const LuoghiPage = async () => {
  const collectionLuoghi = await findCollection({ collection: 'stakeholders' })
  const globalLuoghi = await findGlobals({ slug: 'testi' })

  return (
    <main>
      <div className="bg-white">
        <h1>Luoghi</h1>
        <pre>{JSON.stringify(globalLuoghi, null, 2)}</pre>
        <h2>Componente galleria</h2>
        <pre>{JSON.stringify(collectionLuoghi, null, 2)}</pre>
        <Suspense fallback={<div>Loading footer...</div>}>
          <Footer />
        </Suspense>
      </div>
    </main>
  )
}

export default LuoghiPage
