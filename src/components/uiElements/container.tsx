import { cn } from '@/lib/utils'

export function Container({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const classes = cn('max-w-screen-xl mx-auto p-4 md:p-8 py-10 w-full', className)
  return <div className={classes}>{children}</div>
}
