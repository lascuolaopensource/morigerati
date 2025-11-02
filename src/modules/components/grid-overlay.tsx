'use client'

// TODO - Rework

import { useEffect, useRef, useState } from 'react'

interface Props {
	targetSquareSize?: number
	bottomDensity?: number
	effectRows?: number
}

export function GridOverlay(props: Props) {
	const { targetSquareSize = 20, bottomDensity = 3, effectRows = 5 } = props
	const [grid, setGrid] = useState<boolean[][]>([])
	const [squareSize, setSquareSize] = useState(0)
	const overlayRef = useRef<HTMLDivElement>(null)
	const [isScrolling, setIsScrolling] = useState(false)
	const scrollTimeout = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		const createInitialGrid = (rows: number, cols: number) => {
			const newGrid: boolean[][] = []
			for (let i = 0; i < rows; i++) {
				const row: boolean[] = []
				for (let j = 0; j < cols; j++) {
					if (i >= rows - effectRows) {
						const relativeRow = i - (rows - effectRows)
						const threshold = (relativeRow / effectRows) * bottomDensity
						row.push(Math.random() < threshold)
					} else {
						row.push(false)
					}
				}
				newGrid.push(row)
			}
			return newGrid
		}

		const updateGrid = () => {
			if (!overlayRef.current) return

			const imageContainer = overlayRef.current.previousElementSibling as HTMLElement
			if (!imageContainer) return

			const { width, height } = imageContainer.getBoundingClientRect()

			const squaresPerRow = Math.round(width / targetSquareSize)
			const actualSquareSize = width / squaresPerRow

			setSquareSize(actualSquareSize)

			const cols = squaresPerRow
			const rows = Math.ceil(height / actualSquareSize)

			setGrid(createInitialGrid(rows, cols))
		}

		const handleScroll = () => {
			setIsScrolling(true)

			if (scrollTimeout.current) {
				clearTimeout(scrollTimeout.current)
			}

			scrollTimeout.current = setTimeout(() => {
				setIsScrolling(false)
			}, 200)
		}

		updateGrid()
		window.addEventListener('resize', updateGrid)
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('resize', updateGrid)
			window.removeEventListener('scroll', handleScroll)
			if (scrollTimeout.current) {
				clearTimeout(scrollTimeout.current)
			}
		}
	}, [targetSquareSize, bottomDensity, effectRows])

	useEffect(() => {
		if (!isScrolling) return

		const animatePixels = () => {
			setGrid((prevGrid) => {
				const newGrid = [...prevGrid]
				const effectiveRows = newGrid.slice(-effectRows)

				effectiveRows.forEach((row, i) => {
					const relativeRow = i
					const baseThreshold = (relativeRow / effectRows) * bottomDensity
					row.forEach((cell, j) => {
						if (Math.random() < 0.02) {
							const randomFactor = Math.random() * 0.1 - 0.05
							const threshold = baseThreshold + randomFactor
							newGrid[newGrid.length - effectRows + i][j] = Math.random() < threshold
						}
					})
				})

				return newGrid
			})
		}

		const animationInterval = setInterval(animatePixels, 200)
		return () => clearInterval(animationInterval)
	}, [isScrolling, effectRows, bottomDensity])

	return (
		<div
			ref={overlayRef}
			className="absolute inset-x-0 bottom-0 pointer-events-none"
			style={{
				zIndex: 10,
				display: 'flex',
				flexWrap: 'wrap',
				alignContent: 'flex-end',
			}}
		>
			{grid.map((row, i) =>
				row.map((cell, j) => (
					<div
						key={`${i}-${j}`}
						className={`${cell ? ' bg-white' : ''}`}
						style={{
							width: `${squareSize}px`,
							height: `${squareSize}px`,
							transition: 'background-color 0.4s ease',
						}}
					/>
				)),
			)}
		</div>
	)
}

export default GridOverlay
