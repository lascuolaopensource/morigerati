//Locale
import { Link } from '@/i18n/routing'

interface BackButtonProps {
  message: any
  redirect: string
}

const BackButton = ({ message, redirect }: BackButtonProps) => {
  return (
    <Link
      href={redirect}
      className="rounded-lg transition-transform duration-300 ease-in-out cursor-pointer hover:scale-110"
      aria-label="back button"
    >
      <p className="px-2 py-1 font-bold">← {message}</p>
    </Link>
  )
}

export default BackButton
