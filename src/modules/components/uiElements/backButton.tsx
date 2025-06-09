//Locale
import { Link } from '@/modules/i18n/routing'
import { cn } from '@/modules/utils/utils'

interface BackButtonProps {
  message: string
  redirect: string
  className?: string
}

const BackButton = ({ message, redirect, className }: BackButtonProps) => {
  const classes = cn('hover:underline font-bold', className)

  return (
    <Link href={redirect} className={classes} aria-label="back button">
      ← {message}
    </Link>
  )
}

export default BackButton
