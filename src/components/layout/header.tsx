import React from 'react'
import Link from 'next/link'
import { Locale } from '@/utils/localization'
import LanguageSwitcher from '@/components/LanguageSwitcher'

interface HeaderProps {
  currentLocale: Locale
}

const Header: React.FC<HeaderProps> = ({ currentLocale }) => {
  return (
    <header className="bg-base-100 shadow-md">
      <div className="navbar max-w-screen-xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href={`/${currentLocale}`}>Home</Link>
              </li>
              <li>
                <Link href={`/${currentLocale}/itinerari`}>Itinerari</Link>
              </li>
              <li>
                <Link href={`/${currentLocale}/luoghi`}>Luoghi</Link>
              </li>
              <li>
                <Link href={`/${currentLocale}/residenze`}>Residenze</Link>
              </li>
              <li>
                <Link href={`/${currentLocale}/about`}>About</Link>
              </li>
            </ul>
          </div>
          <Link href={`/${currentLocale}`} className="btn btn-ghost text-xl">
            Morigerati
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href={`/${currentLocale}`}>Home</Link>
            </li>
            <li>
              <Link href={`/${currentLocale}/itinerari`}>
                {currentLocale === 'it' ? 'Itinerari' : 'Itineraries'}
              </Link>
            </li>
            <li>
              <Link href={`/${currentLocale}/luoghi`}>
                {currentLocale === 'it' ? 'Luoghi' : 'Places'}
              </Link>
            </li>
            <li>
              <Link href={`/${currentLocale}/residenze`}>
                {currentLocale === 'it' ? 'Residenze' : 'Residences'}
              </Link>
            </li>
            <li>
              <Link href={`/${currentLocale}/about`}>About</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <LanguageSwitcher currentLocale={currentLocale} />
        </div>
      </div>
    </header>
  )
}

export default Header
