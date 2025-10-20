import { command, form, query } from '$app/server';
import { Effect, Schema } from 'effect';

const hellos: string[] = [];

export const helloQuery = query(async () => {
	return Effect.runPromise(
		Effect.gen(function* () {
			yield* Effect.sleep(100);

			return 'Hello, World!';
		})
	);
});

export const helloForm = form(
	Schema.standardSchemaV1(
		Schema.Struct({
			name: Schema.String.pipe(Schema.minLength(1), Schema.maxLength(100))
		})
	),
	async ({ name }) => {
		return Effect.runPromise(
			Effect.gen(function* () {
				yield* Effect.sleep(200);

				const value = `Hello, ${name}!`;

				hellos.push(value);

				return value;
			})
		);
	}
);

export const helloCommand = command(
	Schema.standardSchemaV1(
		Schema.Struct({
			name: Schema.String.pipe(Schema.minLength(1), Schema.maxLength(100))
		})
	),
	async ({ name }) => {
		return Effect.runPromise(
			Effect.gen(function* () {
				yield* Effect.sleep(250);

				const value = `Hello, ${name}!`;

				hellos.push(value);

				return hellos;
			})
		);
	}
);

export const resetHellosCommand = command(() => {
	hellos.length = 0;
});
