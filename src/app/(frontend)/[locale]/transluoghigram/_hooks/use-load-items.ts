'use client'

import { useCallback, useEffect, useState } from 'react'

import type { SocialPost } from '@/payload-types'

import { sdk } from './sdk'

//
//

type UseLoadItemsOptions = {
	limit?: number
	sort?: string
	depth?: number
	initialData?: SocialPost[]
	initialPage?: number
}

type UseLoadItemsReturn = {
	loading: boolean
	items: SocialPost[]
	hasNextPage: boolean
	error: Error | null
	loadMore: () => void
}

export function useLoadItems(options: UseLoadItemsOptions = {}): UseLoadItemsReturn {
	const { limit = 10, sort, depth, initialData, initialPage = 1 } = options

	// If initialData is provided, we already have page 1, so start at page 2
	const startingPage = initialData ? initialPage + 1 : initialPage

	const [items, setItems] = useState<SocialPost[]>(initialData ?? [])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<Error | null>(null)
	const [hasNextPage, setHasNextPage] = useState(true)
	const [page, setPage] = useState(startingPage)
	const [initialLoad, setInitialLoad] = useState(!initialData)

	const loadMore = useCallback(async () => {
		// Guard against concurrent requests and no more pages
		if (loading || !hasNextPage) return

		setLoading(true)
		setError(null)

		try {
			const response = await sdk.find({
				collection: 'social-post',
				limit,
				page,
				sort,
				depth,
			})

			setItems((prevItems) => {
				// Deduplicate by ID to prevent duplicates
				const existingIds = new Set(prevItems.map((item) => item.id))
				const newItems = response.docs.filter((item) => !existingIds.has(item.id))
				return [...prevItems, ...newItems]
			})
			setHasNextPage(response.hasNextPage ?? false)
			setPage((prevPage) => prevPage + 1)
		} catch (err) {
			setError(err instanceof Error ? err : new Error('Unknown error'))
		} finally {
			setLoading(false)
		}
	}, [loading, hasNextPage, page, depth, limit, sort])

	useEffect(() => {
		if (initialLoad) {
			loadMore()
			setInitialLoad(false)
		}
	}, [initialLoad, loadMore])

	return {
		loading,
		items,
		hasNextPage,
		error,
		loadMore,
	}
}
