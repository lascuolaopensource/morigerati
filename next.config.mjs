import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

const skipTypecheck = process.env.SKIP_TYPECHECK === '1'

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone', // Uncomment for optimized Dockerfile
	// Set SKIP_TYPECHECK=1 at build time (Coolify build env) to skip tsc/eslint during `next build`.
	typescript: {
		ignoreBuildErrors: skipTypecheck,
	},
	eslint: {
		ignoreDuringBuilds: skipTypecheck,
	},
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
