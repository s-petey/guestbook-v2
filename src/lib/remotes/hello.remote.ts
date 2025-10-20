import { form } from '$app/server';
import { Effect, Schema } from 'effect';

export const getHello = form(
	Schema.standardSchemaV1(
		Schema.Struct({
			name: Schema.String.pipe(Schema.minLength(1), Schema.maxLength(100))
		})
	),
	async ({ name }) => {
		return Effect.runPromise(
			Effect.gen(function* () {
				yield* Effect.sleep(100);

				return `Hello, ${name}!`;
			})
		);
	}
);
