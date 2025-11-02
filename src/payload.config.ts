import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import { it } from '@payloadcms/translations/languages/it'
// storage-adapter-import-placeholder
import { localization } from '#/i18n'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Media } from '@/db/collections/fino'
import { Users } from '@/db/collections/uten'
import { Home } from '@/db/globals/shome'

//

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},

	collections: [Users, Media],
	globals: [Home],

	secret: process.env.PAYLOAD_SECRET || '',
	typescript: {
		outputFile: path.resolve(dirname, 'payload-types.ts'),
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI || '',
		},
	}),
	sharp,
	plugins: [s3()],
	localization: localization,
	i18n: {
		fallbackLanguage: 'it',
		supportedLanguages: {
			it: it,
		},
	},
})

//

function s3() {
	return s3Storage({
		disableLocalStorage: true,
		collections: {
			[Media.slug]: true,
		},
		bucket: process.env.S3_BUCKET!,
		enabled: true,
		config: {
			endpoint: process.env.S3_ENDPOINT!,
			region: process.env.S3_REGION!,
			credentials: {
				accessKeyId: process.env.S3_ACCESS_KEY_ID!,
				secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
			},
			forcePathStyle: true,
		},
	})
}
