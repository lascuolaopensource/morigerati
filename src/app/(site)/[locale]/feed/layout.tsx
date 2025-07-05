import PixelBorder from '@/modules/components/uiElements/pixelBorder'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PixelBorder />

      <div className="max-w-sm mx-auto py-12 space-y-12">
        <h1 className="text-5xl font-bold ">Transluoghigram</h1>
        {children}
      </div>
    </div>
  )
}
