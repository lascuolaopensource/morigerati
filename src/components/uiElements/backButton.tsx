'use client'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/components/TranslationProvider'
import { getLocaleFromPath } from '@/utils/localization'

const BackButton = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { t, locale } = useTranslation()

  // Detect the current page section
  const getPageSection = () => {
    const pathParts = pathname.split('/').filter(Boolean)

    // Skip the locale part
    const pathWithoutLocale = pathParts.slice(1).join('/')

    if (pathWithoutLocale.startsWith('luoghi')) return 'luoghi'
    if (pathWithoutLocale.startsWith('itinerari')) return 'itinerari'
    if (pathWithoutLocale.startsWith('stakeholders')) return 'stakeholders'
    if (pathWithoutLocale.startsWith('residenze')) return 'residenze'
    if (pathWithoutLocale.startsWith('articoli')) return 'articoli'
    return ''
  }

  const getParentRoute = () => {
    const section = getPageSection()
    // Use the current locale from the context, not from the URL
    return section ? `/${locale}/${section}` : `/${locale}`
  }

  const handleClick = () => {
    router.push(getParentRoute())
  }

  // Map sections to translation keys
  const sectionToTranslationMap = {
    luoghi: 'buttons.allPlaces',
    itinerari: 'buttons.allItineraries',
    stakeholders: 'buttons.allStakeholders',
    residenze: 'buttons.allResidences',
    articoli: 'buttons.back',
    '': 'buttons.back',
  }

  const GetPath = () => {
    const section = getPageSection()
    const translationKey = sectionToTranslationMap[section] || 'buttons.back'
    return t(translationKey)
  }

  // Map sections to color classes
  const sectionToColorMap = {
    luoghi: 'bg-luogoColor',
    itinerari: 'bg-itinerarioColor',
    stakeholders: 'bg-stakeholderColor',
    residenze: '',
    articoli: 'bg-white',
    '': 'bg-white',
  }

  const GetColor = () => {
    const section = getPageSection()
    return sectionToColorMap[section] || 'bg-white'
  }

  const sectionToBorderMap = {
    luoghi: 'border-luogoColorScuro',
    itinerari: 'border-itinerarioColorScuro',
    stakeholders: 'border-stakeholderColorScuro',
    residenze: '',
    articoli: 'border-black',
    '': 'bg-white',
  }

  const GetColorScuro = () => {
    const section = getPageSection()
    return sectionToBorderMap[section] || 'bg-white'
  }

  const pathName = GetPath()

  return (
    <button
      onClick={handleClick}
      className={`${GetColorScuro()} ${GetColor()} rounded-lg transition-transform duration-300 ease-in-out cursor-pointer hover:scale-110`}
      aria-label={t('buttons.back', 'Go back')}
    >
      <p className="px-2 py-1 font-bold">← {pathName}</p>
    </button>
  )
}

export default BackButton
