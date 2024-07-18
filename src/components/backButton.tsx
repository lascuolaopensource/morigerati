'use client'
import { useRouter } from 'next/navigation'

const BackButton = () => {
  const router = useRouter()

  const handleClick = () => {
    router.back()
  }

  return (
    <button
      onClick={handleClick}
      className="w-12 h-12 flex items-center justify-center border-2 border-black bg-white hover:bg-gray-100 transition-colors relative"
      aria-label="Go back"
    >
      <svg
        className="w-6 h-6 text-black"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
    </button>
  )
}

export default BackButton
