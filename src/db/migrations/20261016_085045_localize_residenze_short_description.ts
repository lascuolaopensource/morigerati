import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Schema change from `payload migrate:create`.
 * Data copy steps added so existing residenze keep their short_description
 * (plain ADD ... NOT NULL would fail or wipe values on a populated DB).
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
	await db.execute(sql`
		ALTER TABLE "residenze_locales" ADD COLUMN "short_description" varchar;
	`)

	await db.execute(sql`
		UPDATE "residenze_locales" AS rl
		SET "short_description" = r."short_description"
		FROM "residenze" AS r
		WHERE rl."_parent_id" = r."id";
	`)

	await db.execute(sql`
		ALTER TABLE "residenze_locales" ALTER COLUMN "short_description" SET NOT NULL;
	`)

	await db.execute(sql`
		ALTER TABLE "residenze" DROP COLUMN "short_description";
	`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
	await db.execute(sql`
		ALTER TABLE "residenze" ADD COLUMN "short_description" varchar;
	`)

	await db.execute(sql`
		UPDATE "residenze" AS r
		SET "short_description" = rl."short_description"
		FROM "residenze_locales" AS rl
		WHERE rl."_parent_id" = r."id" AND rl."_locale" = 'it';
	`)

	await db.execute(sql`
		ALTER TABLE "residenze" ALTER COLUMN "short_description" SET NOT NULL;
	`)

	await db.execute(sql`
		ALTER TABLE "residenze_locales" DROP COLUMN "short_description";
	`)
}
