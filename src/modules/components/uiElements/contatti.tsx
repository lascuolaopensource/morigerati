import { cn } from '@/modules/utils/utils'
import { Luoghi, Persone } from '@/payload-types'
import { useMessages } from 'next-intl'

//

type ContattiLuoghi = NonNullable<Luoghi['contatti']>
type ContattiPersone = NonNullable<Persone['contatti']>
type Contatti = ContattiLuoghi | ContattiPersone
type Contatto = Contatti[number]

//

type ContattiProps = {
  contatti: Contatti
  className?: string
}

export function Contatti({ contatti, className }: ContattiProps) {
  const classes = cn('space-y-4', className)

  return (
    <ul className={classes}>
      {contatti.map((contatto, index) => (
        <li key={index}>
          <Contatto contatto={contatto} />
        </li>
      ))}
    </ul>
  )
}

export function Contatto({ contatto }: { contatto: Contatto }) {
  const messages = useMessages()

  return (
    <>
      <p className="font-medium">{contatto.nome}</p>
      {contatto.telefono && (
        <p className="text-sm">
          {messages.luoghi.phone}: {contatto.telefono}
        </p>
      )}
      {contatto.email && (
        <p className="text-sm">
          {messages.luoghi.email}: {contatto.email}
        </p>
      )}
      {contatto.link && (
        <p className="text-sm">
          {messages.luoghi.link}:{' '}
          <a
            href={contatto.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {contatto.link}
          </a>
        </p>
      )}
    </>
  )
}
