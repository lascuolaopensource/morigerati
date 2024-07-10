import React, { Suspense } from 'react'

import Navbar from '../../../components/navbar'
import Footer from '../../../components/footer'

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div>
      {' '}
      <Navbar backgroundColor="bg-luogoColor" currentPage="/luoghi" />
      <div className="bg-white">My Post: {params.slug}</div>
      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer />
      </Suspense>
    </div>
  )
}
