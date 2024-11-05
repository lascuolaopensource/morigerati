'use client'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

const BackButton = () => {
  const router = useRouter()

  const handleClick = () => {
    router.back()
  }
  const GetPath = () => {
    const pathname = usePathname()
    if (pathname.startsWith('/luoghi')) return 'tutti i luoghi'
    if (pathname.startsWith('/itinerari')) return 'tutti gli itinerari'
    if (pathname.startsWith('/stakeholders')) return 'tutti gli stakeholder'
    if (pathname.startsWith('/residenze')) return 'tutte le residenze'
    if (pathname.startsWith('/articoli')) return 'indietro'
  }

  const GetColor = () => {
    const pathname = usePathname()
    if (pathname.startsWith('/luoghi')) return 'bg-luogoColor'
    else if (pathname.startsWith('/itinerari')) return 'bg-itinerarioColor'
    else if (pathname.startsWith('/stakeholders')) return 'bg-stakeholderColor'
    else if (pathname.startsWith('/residenze')) return 'bg-residenzeColor'
    else if (pathname.startsWith('/articoli')) return 'bg-white'
    else return 'bg-white'
  }

  const GetColorScuro = () => {
    const pathname = usePathname()
    if (pathname.startsWith('/luoghi')) return 'border-luogoColorScuro'
    else if (pathname.startsWith('/itinerari')) return 'border-itinerarioColorScuro'
    else if (pathname.startsWith('/stakeholders')) return 'border-stakeholderColorScuro'
    else if (pathname.startsWith('/residenze')) return 'border-residenzeColorScuro'
    else if (pathname.startsWith('/articoli')) return 'border-black'
    else return 'bg-white'
  }

  const pathName = GetPath()
  return (
    <button
      onClick={handleClick}
      className={`border-2 ${GetColorScuro()} ${GetColor()} rounded-lg   `}
      aria-label="Go back"
    >
      <p className="px-1 py-1  font-bold">← {pathName}</p>
    </button>
  )
}

export default BackButton
