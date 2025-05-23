import { MainCollections } from '@/utils/types'
import BackButton from '../uiElements/backButton'
import LuogoMap from '../uiElements/LuogoMap'
import { LatLngTuple } from 'leaflet'
import { getColorTheme } from '@/utils/colors'
import PixelBorder from '../uiElements/pixelBorder'

type Props = {
  collection: MainCollections
  backButton: {
    message: string
    href: string
  }
  title: string
  position: LatLngTuple
  children?: React.ReactNode
}

export function DetailPageHeading(props: Props) {
  const { collection, backButton, title, position, children } = props
  const { bg } = getColorTheme(collection)

  return (
    <>
      <div className={bg}>
        <div className="flex flex-col justify-between sm:flex-row sm:items-center mx-auto max-w-screen-xl px-4 md:px-8 gap-4 sm:gap-8 py-8">
          <div className="space-y-3">
            <BackButton message={backButton.message} redirect={backButton.href} />
            <h1 className="text-4xl text-white font-bold">{title}</h1>
            {children}
          </div>
          <LuogoMap position={position} className="grow !h-[300px] w-full max-w-[500px]" />
        </div>
      </div>
      <PixelBorder className={bg} />
    </>
  )
}
