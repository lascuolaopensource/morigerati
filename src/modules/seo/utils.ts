import { appConfig } from '@/app-config'

export function generateBaseSEOTitle(title?: string | null | undefined): string {
  return title ? `${title} | ${appConfig.name}` : `${appConfig.name}`
}
