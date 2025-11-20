import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone', // Uncomment for optimized Dockerfile
	webpack: (webpackConfig) => {
		webpackConfig.resolve.extensionAlias = {
			'.cjs': ['.cts', '.cjs'],
			'.js': ['.ts', '.tsx', '.js', '.jsx'],
			'.mjs': ['.mts', '.mjs'],
		}

		return webpackConfig
	},
}

const withNextIntl = createNextIntlPlugin('./src/modules/i18n/request.ts')

export default withNextIntl(withPayload(nextConfig, { devBundleServerPackages: false }))
