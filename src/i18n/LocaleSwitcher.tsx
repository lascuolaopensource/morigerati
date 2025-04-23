import { useParams } from 'next/navigation'
import { useLocale } from 'next-intl'
import localization from '@/i18n/localization'
import { TypedLocale } from 'payload'
import { usePathname, useRouter } from '@/i18n/routing'
import { ChangeEvent, useTransition } from 'react'

export function LocaleSwitcher() {
  // inspired by https://github.com/amannn/next-intl/blob/main/examples/example-app-router/src/components/LocaleSwitcherSelect.tsx
  const locale = useLocale()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as TypedLocale
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      )
    })
  }

  return (
    <select
      className="w-full max-w-40 text-sm bg-transparent  p-2 "
      defaultValue={locale}
      disabled={isPending}
      onChange={onSelectChange}
    >
      {localization.locales
        .sort((a, b) => a.label.localeCompare(b.label)) // Ordenar por label
        .map((cur) => (
          <option value={cur.code} key={cur.code}>
            {cur.label}
          </option>
        ))}
    </select>
  )
}
