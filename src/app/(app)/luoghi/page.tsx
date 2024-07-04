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
    console.error('Error fetching data:', error)
    return <div>Error loading data. Please try again later.</div>
  }

  if (!collectionLuoghi || !globalLuoghi) {
    console.error('Data is missing:', { collectionLuoghi, globalLuoghi })
    return <div>Data not available. Please try again later.</div>
  }

  const safeStringify = (data: any) => {
    try {
      return JSON.stringify(data, null, 2)
    } catch (error) {
      console.error('Error stringifying data:', error)
      return 'Error: Unable to display data'
    }
  }

  return (
    <div className="bg-white">
      <div className="bg-color-blue pt-9 pl-4 pr-4">
        <h1 className="font-bold text-4xl">Luoghi</h1>
        <pre>{safeStringify(globalLuoghi)}</pre>
        <Luogo />
        <pre>{safeStringify(collectionLuoghi)}</pre>
      </div>
      <div>{/* <Footer /> */}</div>
    </div>
  )
}

export default LuoghiPage
