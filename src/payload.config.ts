import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { s3Storage } from '@payloadcms/storage-s3'
import { it } from '@payloadcms/translations/languages/it'
import { localization } from '#/i18n'
import { Record } from 'effect'
import path from 'path'
import { buildConfig, type AdminDependencies } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Itinerari } from '@/db/collections/itinerari'
import { Luoghi } from '@/db/collections/luoghi'
import { Media } from '@/db/collections/media'
import { Persone } from '@/db/collections/persone'
import { Tracciati } from '@/db/collections/tracciati'
import { Users } from '@/db/collections/users'
import { Video } from '@/db/collections/video'
import { Home } from '@/db/globals/home'

//

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
		dependencies: components({
			divider: 'src/db/_partials/components/divider.tsx',
			gap: 'src/db/_partials/components/gap.tsx',
			header: 'src/db/_partials/components/header.tsx',
			arrayRowLabel: 'src/db/_partials/components/array-row-label.tsx',
		}),
	},

	collections: [Users, Media, Video, Tracciati, Itinerari, Luoghi, Persone],
	globals: [Home],

	secret: process.env.PAYLOAD_SECRET || '',
	typescript: {
		outputFile: path.resolve(dirname, 'payload-types.ts'),
	},
	db: mongooseAdapter({
		url: process.env.DATABASE_URI || '',
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
			[Tracciati.slug]: true,
			[Video.slug]: true,
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

function components(items: Record<string, string>): AdminDependencies {
	return Record.map(items, (item) => ({
		path: item,
		type: 'component',
	}))
}
