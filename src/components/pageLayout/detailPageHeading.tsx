import { MainCollections } from '@/modules/types'
import BackButton from '../uiElements/backButton'
import { getColorTheme } from '@/utils/colors'
import PixelBorder from '../uiElements/pixelBorder'
import DynamicMappa from '../mappa/mapLoader'
import { MapProps } from '../mappa/map'

type Props = {
  collection: MainCollections
  backButton: {
    message: string
    href: string
  }
  title: string
  children?: React.ReactNode
  mapProps?: MapProps
  rightContent?: React.ReactNode
}

export function DetailPageHeading(props: Props) {
  const { collection, backButton, title, children, mapProps, rightContent } = props
  const { bg } = getColorTheme(collection)

  const { initialZoom = 16, showPositionPin = true, ...rest } = mapProps || {}
  const showMap = (rest.initialPosition || rest.gpxUrl || rest.localizedMedia) && !rightContent

  return (
    <>
      <div className={bg}>
        <div className="flex flex-col justify-between sm:flex-row sm:items-center mx-auto max-w-screen-xl px-4 md:px-8 gap-4 sm:gap-8 py-8">
          <div className="space-y-3">
            <BackButton message={backButton.message} redirect={backButton.href} />
            <h1 className="text-4xl text-white font-bold text-balance">{title}</h1>
            {children}
          </div>

          {showMap && (
            <div className="grow h-[300px] sm:h-auto sm:min-h-[300px] sm:self-stretch w-full sm:max-w-[500px]">
              <DynamicMappa initialZoom={initialZoom} showPositionPin={showPositionPin} {...rest} />
            </div>
          )}

          {rightContent}
        </div>
      </div>
      <PixelBorder className={bg} />
    </>
  )
}
