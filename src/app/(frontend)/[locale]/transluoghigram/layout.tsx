import { PixelBorder } from '@/modules/components/pixel-border'

//

export default async function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<PixelBorder className="bg-black" />

			<div className="max-w-sm md:max-w-md mx-auto py-12 space-y-12 px-4">{children}</div>
		</div>
	)
}
