import React from 'react'
import Image from 'next/image'
import logo from '@/public/logo.png'
import IG from '@/public/IG.png'
import YT from '@/public/YT.png'

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white px-4 pt-6">
      <div>
        <div className="flex space-x-4 items-center">
          <div className="flex-1">
            <Image src={logo} alt="Logo" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-xs leading-3">Transluoghi</p>
            <p className="font-light text-[12px] w-full block leading-3 text-left whitespace-nowrap">
              Ecomuseo del Bussento
            </p>
            <p className="font-light text-[12px] w-full block leading-3 text-right justify-right">
              Contemporaneo
            </p>
          </div>
        </div>

        <div className="flex space-x-4 items-top pt-6">
          <div className="flex-1">
            <p className="font-normal leading-3 whitespace-nowrap text-[10px]">Via Santa Croce</p>
            <p className="font-normal leading-3 whitespace-nowrap text-[10px]">214b 84030</p>
            <p className="font-normal leading-3 whitespace-nowrap text-[10px]">Morigerati (SA)</p>

            <p className="pt-1">
              <span className="font-bold leading-3 whitespace-nowrap text-[10px]">email: </span>
              <a
                href="mailto:ciao@transluoghi.it"
                className="font-normal leading-3 whitespace-nowrap text-[10px]"
              >
                ciao@transluoghi.it
              </a>
            </p>
          </div>

          <div className="flex-1">
            <p className="font-bold leading-3 whitespace-nowrap text-[10px]">Orari di apertura:</p>
            <div className="leading-tight pt-3">
              <p className="font-normal leading-3 whitespace-nowrap text-[10px]">
                Lunedì - Venerdì: 9:00 - 18:00
              </p>
              <p className="font-normal leading-3 whitespace-nowrap text-[10px]">
                Sabato: 10:00 - 16:00
              </p>
              <p className="font-normal leading-3 whitespace-nowrap text-[10px]">
                Domenica: Chiuso
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 mb-4 flex space-x-4 items-center justify-end">
        <a>
          <Image src={YT} alt="Youtube" width={24} height={24} />
        </a>
        <a>
          <Image src={IG} alt="Instagram" width={24} height={24} />
        </a>
      </div>
    </footer>
  )
}
export default Footer
