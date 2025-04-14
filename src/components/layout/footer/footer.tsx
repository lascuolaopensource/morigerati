//Boilerplate
import React from 'react'
//Utils
import { renderFooterContent } from '@/components/layout/footer/footerRenderElement'
//UI
import { SocialIcon } from 'react-social-icons'
import LogoGenerator from '@/components/uiElements/logo'
//DB
import type { Footer as FooterType } from '@/payload-types'

const Footer = async ({ footer }: { footer: FooterType }) => {
  return (
    <footer className="bg-black text-white px-2 py-4" style={{ zIndex: 99999 }}>
      {/* mobile */}
      <div className="sm:hidden max-w-screen-xl mx-auto flex flex-col items-left gap-y-4">
        <div className="flex justify-between">
          <LogoGenerator textColor="white" />
          <div className="flex space-x-2">
            {footer?.['Link Social']?.map((social: { link: string }, index: number) => (
              <SocialIcon
                key={index}
                url={social.link}
                style={{ height: 23, width: 23, filter: 'grayscale(100%)' }}
              />
            ))}
          </div>
        </div>

        <div className="flex-1">
          {footer?.testo_sinistra && renderFooterContent(footer.testo_sinistra)}
        </div>
        <div className="flex-1">
          {footer?.testo_destra && renderFooterContent(footer.testo_destra)}
        </div>
      </div>
      {/* desktop */}
      <div className="hidden sm:flex max-w-screen-xl mx-auto justify-between">
        <LogoGenerator textColor="white" />
        <div className="w-1/4">
          {footer?.testo_sinistra && renderFooterContent(footer.testo_sinistra)}
        </div>
        <div className="w-1/4">
          {footer?.testo_destra && renderFooterContent(footer.testo_destra)}
        </div>
        <div className="flex space-x-2">
          {footer?.['Link Social']?.map((social: { link: string }, index: number) => (
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
