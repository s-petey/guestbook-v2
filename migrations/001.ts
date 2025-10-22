import { Reactivity } from '@effect/experimental';
import { Effect } from 'effect';
import { liveClient } from '../src/lib/server/db/client';
import { PersonService } from '../src/lib/server/db/People.service';

Effect.gen(function* () {
	yield* Effect.sleep(200);
	const { CreatePeopleTable } = yield* PersonService;
	yield* CreatePeopleTable.execute();
}).pipe(
	Effect.scoped,
	Effect.provide(liveClient),
	// Effect.provide(BunFileSystem.layer),
	Effect.provide(Reactivity.layer),
	Effect.runPromise
);
