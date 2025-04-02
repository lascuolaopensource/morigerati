import { redirect } from 'next/navigation'
import { defaultLocale } from '@/middleware'

// Redirect from the root to the default locale
export default function RootPage() {
  redirect(`/${defaultLocale}`)
}
