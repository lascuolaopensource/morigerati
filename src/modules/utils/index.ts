import type { Link } from '#/i18n'

import { ArrowBigDown } from 'lucide-react'
import { ComponentProps } from 'react'

//

export type LinkProps = ComponentProps<typeof Link>
export type IconComponent = ComponentProps<typeof ArrowBigDown>

export function capitalizeFirstLetter(string: string): string {
	return string.charAt(0)?.toUpperCase() + string.slice(1)
}
