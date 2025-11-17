'use client'

import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'

//

export const MapLoader = dynamic(() => import('./root-map').then((mod) => mod.RootMap), {
	loading: () => (
		<div className="h-full w-full bg-black/10 animate-pulse flex items-center justify-center text-black/50">
			<Loader2 className="mr-2 h-4 w-4 animate-spin" />
			<p>Loading map...</p>
		</div>
	),
	ssr: false,
})
