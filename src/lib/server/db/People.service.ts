import { Effect, Schema } from 'effect';
import { SqlResolver, SqlSchema, SqlClient } from '@effect/sql';
import { InsertPersonSchema, Person } from '$lib/schemas/Person';

export const PersonService = Effect.gen(function* () {
	const sql = yield* SqlClient.SqlClient;

	const CreatePeopleTable = yield* SqlResolver.void('CreatePeopleTable', {
		Request: Schema.Void,
		execute: () =>
			sql`CREATE TABLE people (
              id INTEGER PRIMARY KEY, name TEXT, 
              createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
              updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )`
	});

	const InsertPerson = SqlSchema.single({
		Request: InsertPersonSchema,
		Result: Person,
		execute: (requests) =>
			sql`
          INSERT INTO people
          ${sql.insert(requests)}
          RETURNING *`
	});

	const QueryPeople = SqlSchema.findOne({
		Request: Schema.Number,
		Result: Person,
		execute: (id) => sql`SELECT * FROM people WHERE id = ${id}`
	});

	const QueryPeopleAll = SqlSchema.findAll({
		execute: () => sql`SELECT * FROM people`,
		Result: Person,
		Request: Schema.Void
	});

	const ResetPeople = SqlSchema.void({
		Request: Schema.Void,
		execute: () => sql`DELETE FROM people`
	});

	return {
		CreatePeopleTable,
		InsertPerson,
		QueryPeople,
		QueryPeopleAll,
		ResetPeople
	};
});
