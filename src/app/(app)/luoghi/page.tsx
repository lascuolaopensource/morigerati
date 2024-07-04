import React from 'react'
import { findCollection, findGlobals } from '@/utils/fetch'
import Footer from '../../components/footer'
import Luogo from '../../components/luogo'

const LuoghiPage = async () => {
  let collectionLuoghi, globalLuoghi
  try {
    collectionLuoghi = await findCollection({ collection: 'stakeholders' })
    globalLuoghi = await findGlobals({ slug: 'testi' })
  } catch (error) {
    console.error('Errore nel recupero dei dati:', error)
  }
  return (
    <div className="bg-white">
      <div className="bg-color-blue pt-9 pl-4 pr-4">
        <h1 className="font-bold text-4xl">Luoghi</h1>
        {globalLuoghi && <pre>{JSON.stringify(globalLuoghi, null, 2)}</pre>}
        <Luogo />
        {collectionLuoghi && <pre>{JSON.stringify(collectionLuoghi, null, 2)}</pre>}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default LuoghiPage
