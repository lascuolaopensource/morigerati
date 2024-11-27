'use client'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

const BackButton = () => {
  const router = useRouter()
  const pathname = usePathname()

  const getParentRoute = () => {
    if (pathname.startsWith('/luoghi')) return '/luoghi'
    if (pathname.startsWith('/itinerari')) return '/itinerari'
    if (pathname.startsWith('/stakeholders')) return '/stakeholders'
    if (pathname.startsWith('/residenze')) return '/residenze'
    if (pathname.startsWith('/articoli')) return '/articoli'
    return '/'
  }

  const handleClick = () => {
    router.push(getParentRoute())
  }

  const GetPath = () => {
    if (pathname.startsWith('/luoghi')) return 'tutti i luoghi'
    if (pathname.startsWith('/itinerari')) return 'tutti gli itinerari'
    if (pathname.startsWith('/stakeholders')) return 'tutti gli stakeholder'
    if (pathname.startsWith('/residenze')) return 'tutte le residenze'
    if (pathname.startsWith('/articoli')) return 'indietro'
  }

  const GetColor = () => {
    if (pathname.startsWith('/luoghi')) return 'bg-luogoColor'
    else if (pathname.startsWith('/itinerari')) return 'bg-itinerarioColor'
    else if (pathname.startsWith('/stakeholders')) return 'bg-stakeholderColor'
    else if (pathname.startsWith('/residenze')) return ''
    else if (pathname.startsWith('/articoli')) return 'bg-white'
    else return 'bg-white'
  }

  const GetColorScuro = () => {
    if (pathname.startsWith('/luoghi')) return 'border-luogoColorScuro'
    else if (pathname.startsWith('/itinerari')) return 'border-itinerarioColorScuro'
    else if (pathname.startsWith('/stakeholders')) return 'border-stakeholderColorScuro'
    else if (pathname.startsWith('/residenze')) return ''
    else if (pathname.startsWith('/articoli')) return 'border-black'
    else return 'bg-white'
  }

  const pathName = GetPath()
  return (
    <button
      onClick={handleClick}
      className={`${GetColorScuro()} ${GetColor()} rounded-lg transition-transform duration-300 ease-in-out cursor-pointer hover:scale-110`}
      aria-label="Go back"
    >
      <p className="px-2 py-1  font-bold">← {pathName}</p>
    </button>
  )
}

export default BackButton
