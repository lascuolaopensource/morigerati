import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { s3Storage } from '@payloadcms/storage-s3'
import { it } from '@payloadcms/translations/languages/it'
import { localization } from '#/i18n'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Articoli } from '@/db/collections/articoli'
import { Itinerari } from '@/db/collections/itinerari'
import { Luoghi } from '@/db/collections/luoghi'
import { Media } from '@/db/collections/media'
import { Persone } from '@/db/collections/persone'
import { Residenze } from '@/db/collections/residenze'
import { Tracciati } from '@/db/collections/tracciati'
import { Account } from '@/db/collections/transluoghigram/account'
import { Post } from '@/db/collections/transluoghigram/post'
import { PostMedia } from '@/db/collections/transluoghigram/post-media'
import { Users } from '@/db/collections/users'
import { Video } from '@/db/collections/video'
import { Home } from '@/db/globals/home'
import { Testi } from '@/db/globals/testi'

import { getPaths } from './modules/utils/server'

//

const { dirname } = getPaths(import.meta.url)

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},

	collections: [
		Users,
		Media,
		Video,
		Tracciati,
		Itinerari,
		Luoghi,
		Persone,
		Residenze,
		Articoli,
		Post,
		PostMedia,
		Account,
	],
	globals: [Home, Testi],

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
