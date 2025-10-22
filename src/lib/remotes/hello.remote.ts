import { command, form, query } from '$app/server';
import { InsertPersonSchema } from '$lib/schemas/Person';
import { liveClient } from '$lib/server/db/client';
import { PersonService } from '$lib/server/db/People.service';
import { Reactivity } from '@effect/experimental';
// import { BunFileSystem } from '@effect/platform-bun';
import { Effect, Schema } from 'effect';

// TODO: Make a "runnable"

export const queryPeople = query(async () => {
	return Effect.gen(function* () {
		yield* Effect.sleep(100);
		const { QueryPeopleAll } = yield* PersonService;

		return yield* QueryPeopleAll();
	}).pipe(
		Effect.scoped,
		Effect.provide(liveClient),
		// Effect.provide(BunFileSystem.layer),
		Effect.provide(Reactivity.layer),
		Effect.runPromise
	);
});

export const createPerson = form(Schema.standardSchemaV1(InsertPersonSchema), async ({ name }) => {
	return Effect.runPromise(
		Effect.gen(function* () {
			yield* Effect.sleep(200);
			const { InsertPerson } = yield* PersonService;

			const value = yield* InsertPerson({
				name
			});

			return value;
		}).pipe(
			Effect.scoped,
			Effect.provide(liveClient),
			// Effect.provide(BunFileSystem.layer),
			Effect.provide(Reactivity.layer)
		)
	);
});

export const helloCommand = command(
	Schema.standardSchemaV1(InsertPersonSchema),
	async ({ name }) => {
		return Effect.gen(function* () {
			yield* Effect.sleep(250);
			const { InsertPerson, QueryPeopleAll } = yield* PersonService;

			yield* InsertPerson({
				name
			});

			return yield* QueryPeopleAll();
		}).pipe(
			Effect.scoped,
			Effect.provide(liveClient),
			// Effect.provide(BunFileSystem.layer),
			Effect.provide(Reactivity.layer),
			Effect.runPromise
		);
	}
);

export const resetPeople = command(() => {
	return Effect.gen(function* () {
		yield* Effect.sleep(100);
		const { ResetPeople } = yield* PersonService;

		return yield* ResetPeople();
	}).pipe(
		Effect.scoped,
		Effect.provide(liveClient),
		// Effect.provide(BunFileSystem.layer),
		Effect.provide(Reactivity.layer),
		Effect.runPromise
	);
});
