import React from 'react'
import { findCollection, findGlobals } from '@/utils/fetch'

const LuoghiPage = async () => {
  const collectionLuoghi = await findCollection({ collection: 'stakeholders' })
  const globalLuoghi = await findGlobals({ slug: 'pagina_luoghi' })

  return (
    <div>
      <h1>Luoghi</h1>
      <pre>{JSON.stringify(globalLuoghi, null, 2)}</pre>
      <h2>Componente galleria</h2>
      <pre>{JSON.stringify(collectionLuoghi, null, 2)}</pre>
    </div>
  )
}

export default LuoghiPage
