import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logoBlack from '@/public/logoBlack.png'
import hamburger from '@/public/hamburger.png'

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-100 relative">
      <div className="py-4 px-6">
        <div className="flex justify-between items-center">
          <div className="w-8">{/* Spazio vuoto a sinistra per bilanciare il layout */}</div>
          <Link href="/" className="flex justify-center">
            <Image src={logoBlack} alt="Logo" width={100} />
          </Link>
          <button className="w-8 h-8 flex items-center justify-center">
            <Image src={hamburger} alt="Menu" width={20} />
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>
    </nav>
  )
}

export default Navbar
