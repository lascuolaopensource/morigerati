'use client'

import { ArrowDown, ArrowUp } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useLayoutEffect, useRef, useState } from 'react'

import { cn } from './shadcn/lib/utils'

//

interface ReadMoreByHeightProps {
	children: React.ReactNode
	maxHeight?: number
	className?: string
}

export function ReadMoreByHeight(props: ReadMoreByHeightProps) {
	const { children, maxHeight = 200, className = '' } = props

	const [expanded, setExpanded] = useState(false)
	const [needsToggle, setNeedsToggle] = useState(true)
	const containerRef = useRef<HTMLDivElement>(null)

	const t = useTranslations('common')

	useLayoutEffect(() => {
		const el = containerRef.current
		if (el) {
			setNeedsToggle(el.scrollHeight > maxHeight)
		}
	}, [children, maxHeight])

	return (
		<div className={cn('space-y-4', className)}>
			<div
				ref={containerRef}
				style={{
					maxHeight: expanded ? 'none' : maxHeight,
					overflow: expanded ? 'visible' : 'hidden',
					transition: 'max-height 0.3s ease',
					position: 'relative',
				}}
				className={cn(!expanded && needsToggle && 'border-b border-b-residenze')}
			>
				{children}
			</div>

			{needsToggle && (
				<button
					type="button"
					onClick={() => setExpanded((e) => !e)}
					className="text-sm hover:underline hover:cursor-pointer flex items-center gap-1 text-residenze"
					aria-expanded={expanded}
				>
					{expanded ? t('show_less') : t('show_more')}
					{expanded ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
				</button>
			)}
		</div>
	)
}
