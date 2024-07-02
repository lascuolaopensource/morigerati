import React from 'react'
import { findCollection, findGlobals } from '@/utils/fetch'
import Footer from '../../components/footer'

const LuoghiPage = async () => {
  const collectionLuoghi = await findCollection({ collection: 'stakeholders' })
  const globalLuoghi = await findGlobals({ slug: 'testi' })

  return (
    <div>
      <h1>Luoghi</h1>
      <pre>{JSON.stringify(globalLuoghi, null, 2)}</pre>
      <h2>Componente galleria</h2>
      <pre>{JSON.stringify(collectionLuoghi, null, 2)}</pre>
      <Footer />
    </div>
  )
}

export default LuoghiPage
