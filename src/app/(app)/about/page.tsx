import React, { Suspense } from 'react'
import { findGlobals, findCollection } from '@/utils/fetch'

import { renderElement, RootNode } from '@/utils/renderElement'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface GlobalTesti {
  testo: {
    root: RootNode
  }
}

const Home = async () => {
  let testoAbout = null

  try {
    const globalData = (await findGlobals({ slug: 'chi_siamo' })) as unknown as GlobalTesti

    testoAbout = globalData.testo.root.children
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return (
    <main className="mx-auto max-w-xl">
      <Navbar backgroundColor="bg-white" currentPage="/about" />
      <div className="bg-white p-3 pt-5">
        <h1 className="font-normal text-3xl pt-4 pb-4 leading-4">Chi siamo</h1>
        {testoAbout ? (
          testoAbout.map((child, index) => (
            <React.Fragment key={index}>
              {child.children.map((element, subIndex) => (
                <React.Fragment key={subIndex}>{renderElement(element, child.tag)}</React.Fragment>
              ))}
            </React.Fragment>
          ))
        ) : (
          <p>Error loading about text data</p>
        )}
      </div>
      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer />
      </Suspense>
    </main>
  )
}

export default Home
