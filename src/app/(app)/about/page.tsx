import React, { Suspense } from 'react'
import { findGlobals } from '@/utils/fetch'
import renderElement, { RootNode } from '@/utils/renderElement'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface GlobalTesti {
  testo: {
    root: RootNode
  }
}

const About = async () => {
  let testoAbout: RootNode['children'] | null = null
  let errorMessage: string | null = null

  try {
    const globalData = (await findGlobals({ slug: 'chi_siamo' })) as unknown as GlobalTesti
    console.log('Global Data:', JSON.stringify(globalData, null, 2))

    if (globalData && globalData.testo && globalData.testo.root) {
      testoAbout = globalData.testo.root.children
    } else {
      errorMessage = 'Missing or invalid data structure'
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    errorMessage = 'Error fetching data'
  }

  return (
    <main className="mx-auto max-w-xl">
      <Navbar backgroundColor="bg-white" currentPage="/about" />
      <div className="bg-white p-3 pt-5">
        <h1 className="font-normal text-3xl pt-4 pb-4 leading-4">Chi siamo</h1>
        {testoAbout ? (
          renderElement([{ children: testoAbout }])
        ) : (
          <p>Error loading about text data: {errorMessage}</p>
        )}
      </div>
      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer />
      </Suspense>
    </main>
  )
}

export default About
