import { Reactivity } from '@effect/experimental';
import { BunFileSystem } from '@effect/platform-bun';
import { describe, expect, test } from 'bun:test';
import { Effect, Option } from 'effect';
import { testClient } from './client';
import { PersonService } from './People.service';

describe('Client', () => {
	test('can insert and get records from a test DB', () =>
		Effect.gen(function* () {
			// const sql = yield* testClient;
			const { CreatePeopleTable, InsertPerson, QueryPeople, QueryPeopleAll } = yield* PersonService;

			yield* CreatePeopleTable.execute();
			yield* InsertPerson({
				name: 'Alice'
			});
			const row = yield* QueryPeople(1);

			expect(Option.isSome(row)).toBe(true);
			if (Option.isNone(row)) {
				throw new Error('Person not found');
			}
			expect(row.value).toMatchObject({
				id: 1,
				name: 'Alice'
			});

			yield* InsertPerson({
				name: 'Bob'
			});

			const rows = yield* QueryPeopleAll();

			expect(rows).toMatchObject([
				{
					id: 1,
					name: 'Alice'
				},
				{
					id: 2,
					name: 'Bob'
				}
			]);
		}).pipe(
			Effect.provide(testClient),
			Effect.provide(BunFileSystem.layer),
			Effect.provide(Reactivity.layer),
			Effect.scoped,
			Effect.runPromise
		));
});
