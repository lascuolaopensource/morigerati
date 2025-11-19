import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
	width: 32,
	height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
	return new ImageResponse(
		(
			// ImageResponse JSX element
			<div
				style={{
					fontSize: 24,
					background: 'black',
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					color: 'white',
				}}
			>
				T
			</div>
		),
		// ImageResponse options
		{
			// For convenience, we can re-use the exported icons size metadata
			// config to also set the ImageResponse's width and height.
			...size,
		},
	)
}

// 'use client'
// import React, { useEffect, useState } from 'react'

// const DynamicFavicon = () => {
//   const [letter, setLetter] = useState('')

//   const generateLetter = () => {
//     const alphabet = 'abcdefghijklmnopqrstuvwxyz'
//     const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)]
//     setLetter(randomLetter)

//     // Create and update favicon
//     const canvas = document.createElement('canvas')
//     canvas.width = 32
//     canvas.height = 32
//     const ctx = canvas.getContext('2d')

//     if (ctx) {
//       // Set background
//       ctx.fillStyle = '#ffffff'
//       ctx.fillRect(0, 0, 32, 32)

//       // Prima carica il font Transluoghi
//       document.fonts.ready.then(() => {
//         // Set text style con Transluoghi
//         ctx.fillStyle = '#000000'
//         ctx.font = '24px Transluoghi'
//         ctx.textAlign = 'center'
//         ctx.textBaseline = 'middle'

//         // Draw letter
//         ctx.fillText(randomLetter, 16, 16)

//         // Update favicon
//         const link =
//           (document.querySelector("link[rel*='icon']") as HTMLLinkElement) ||
//           document.createElement('link')
//         link.type = 'image/x-icon'
//         link.rel = 'shortcut icon'
//         link.href = canvas.toDataURL()
//         document.head.appendChild(link)
//       })
//     }
//   }

//   useEffect(() => {
//     // Assicuriamoci che il font sia caricato prima di iniziare
//     if (document.fonts) {
//       document.fonts.ready.then(() => {
//         generateLetter()
//         const interval = setInterval(generateLetter, 3000)
//         return () => clearInterval(interval)
//       })
//     }
//   }, [])

//   return null
// }

// export default DynamicFavicon
