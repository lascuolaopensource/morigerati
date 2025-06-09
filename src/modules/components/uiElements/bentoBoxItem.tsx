import { RandomLetterNew } from './randomLetterNew'

type Props = {
  label?: string
  value?: string
  children?: React.ReactNode
  layout?: 'left' | 'center'
}

export function BentoBoxItem({ label, value, layout = 'left', children }: Props) {
  return (
    <div className=" bg-white/20 rounded-md py-2 px-3 text-black relative overflow-hidden">
      <RandomLetterNew className="absolute top-0 right-0 text-white" size={70} />

      <div className="space-y-1">
        {label && (
          <p className="text-xs uppercase font-semibold tracking-wider text-black/60">{label}</p>
        )}
        {value && <p className="text-xl break-words overflow-hidden">{value}</p>}
        {children}
      </div>
    </div>
  )
}
