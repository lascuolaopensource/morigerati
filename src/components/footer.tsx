import React from 'react'
import Image from 'next/image'
import logo from '@/public/logo.png'
import { loadDb } from '@/utils/db'
import { renderFooterContent } from '@/utils/footerRenderElement'

const Footer = async () => {
  const db = await loadDb()
  const footer = await db.findGlobal({ slug: 'footer' })

  return (
    <footer className="bg-black text-white">
      <div className="px-4 pt-6 max-w-7xl mx-auto">
        <div className="mx-auto  max-w-xl">
          <div className="flex space-x-4 items-center">
            <div className="flex-1">
              <Image src={logo} alt="Logo" width={140} height={100} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-l">{footer.title || ''}</p>
            </div>
          </div>
          <div className="flex space-x-4 items-top pt-3">
            <div className="flex-1">{renderFooterContent(footer.testo_sinistra)}</div>
            <div className="flex-1">{renderFooterContent(footer.testo_destra)}</div>
          </div>
        </div>
        <div className="mt-4 mb-4 flex space-x-4 items-center justify-end">
          {footer['Link Social']?.map((social, index) => (
            <a key={index} href={social.link} target="_blank" rel="noopener noreferrer">
              <Image src={`/${social.nome}.png`} alt={social.nome} width={24} height={24} />
            </a>
          ))}
        </div>
        <div className="pb-5"></div>
      </div>
    </footer>
  )
}

export default Footer
