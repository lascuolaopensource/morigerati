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
    if (pathname.startsWith('/articoli')) return 'tutti gli articoli'
  }

  const pathName = GetPath()
  return (
    <button
      onClick={handleClick}
      className=" items-center justify-center  relative"
      aria-label="Go back"
    >
      <p className="underline">← {pathName}</p>
    </button>
  )
}

export default BackButton
