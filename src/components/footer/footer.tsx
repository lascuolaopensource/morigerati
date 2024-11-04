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
    <footer className="bg-black text-white py-2 px-2 z-2">
      <div className=" max-w-7xl mx-auto">
        <div className="mx-auto max-w-xl">
          <div className="flex justify-between items-center">
            <div className="">
              <LogoGenerator textColor="white" />
            </div>
            <div className="flex justify-end">
              {footer['Link Social']?.map((social, index) => (
                <div key={index} className="px-2">
                  <SocialIcon
                    url={social.link}
                    style={{ height: 23, width: 23, filter: 'grayscale(100%)' }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-top pt-3">
            <div className="flex-1">{renderFooterContent(footer.testo_sinistra)}</div>
            <div className="flex-1">{renderFooterContent(footer.testo_destra)}</div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
