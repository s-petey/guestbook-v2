import { FileSystem } from '@effect/platform/FileSystem';
import { SqliteClient } from '@effect/sql-sqlite-bun';
import { Effect, Layer } from 'effect';

export const testClient = Layer.unwrapEffect(
	Effect.gen(function* () {
		const fs = yield* FileSystem;
		const dir = yield* fs.makeTempDirectoryScoped();

		return SqliteClient.layer({
			filename: dir + '/test.db'
		});
	})
);

// TODO: Move to env?
const LIVE_DB_DIR = '';
const LIVE_DB_FILE = LIVE_DB_DIR + 'database.sqlite';

export const liveClient = SqliteClient.layer({
	filename: LIVE_DB_FILE,
	create: true
});
