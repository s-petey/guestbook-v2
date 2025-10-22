import { Schema, Struct } from 'effect';

export class Person extends Schema.Class<Person>('Person')({
	id: Schema.Number,
	name: Schema.String,
	createdAt: Schema.DateFromString,
	updatedAt: Schema.DateFromString
}) {}

export const InsertPersonSchema = Schema.Struct(
	Struct.omit(Person.fields, 'id', 'createdAt', 'updatedAt')
);
