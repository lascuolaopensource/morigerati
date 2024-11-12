import React from 'react'
import Image from 'next/image'
import IG from '@/public/IG.png'
import { loadDb } from '@/utils/db'
import { renderFooterContent } from '@/utils/footerRenderElement'
import LogoGenerator from '@/components/logoGenerator/logo'
import { SocialIcon } from 'react-social-icons'

const Footer = async () => {
  const db = await loadDb()
  const footer = await db.findGlobal({ slug: 'footer' })

  return (
    <footer className="bg-black text-white px-2 py-4" style={{ zIndex: 99999 }}>
      {/* mobile */}
      <div className="sm:hidden max-w-screen-xl mx-auto flex flex-col items-left gap-y-4">
        <div className="flex justify-between">
          <LogoGenerator textColor="white" />
          <div className="flex space-x-2">
            {footer['Link Social']?.map((social, index) => (
              <SocialIcon
                key={index}
                url={social.link}
                style={{ height: 23, width: 23, filter: 'grayscale(100%)' }}
              />
            ))}
          </div>
        </div>

        <div className="flex-1">{renderFooterContent(footer.testo_sinistra)}</div>
        <div className="flex-1">{renderFooterContent(footer.testo_destra)}</div>
      </div>
      {/* desktop */}
      <div className="hidden sm:flex max-w-screen-xl mx-auto justify-between">
        <LogoGenerator textColor="white" />
        <div className="w-1/4">{renderFooterContent(footer.testo_sinistra)}</div>
        <div className="w-1/4">{renderFooterContent(footer.testo_destra)}</div>
        <div className="flex space-x-2">
          {footer['Link Social']?.map((social, index) => (
            <SocialIcon
              key={index}
              url={social.link}
              style={{ height: 23, width: 23, filter: 'grayscale(100%)' }}
            />
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
