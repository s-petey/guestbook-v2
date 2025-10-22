import { Person } from '$lib/schemas/Person';
import type { Transport } from '@sveltejs/kit';
import { Schema } from 'effect';

export const transport: Transport = {
	Person: {
		encode: (value) => value instanceof Person && Schema.encodeSync(Person)(value),
		decode: (value) => Schema.decodeSync(Person)(value)
	}
};
