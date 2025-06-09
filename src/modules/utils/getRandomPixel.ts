export function getRandomPixel() {
  const pixelPath = `/pixels/p${Math.floor(Math.random() * 5)}.svg`

  return {
    svgPath: pixelPath,
    cssUrl: `url(${pixelPath})`,
  }
}
