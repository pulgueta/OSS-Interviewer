import { type TypeOf, object, string, coerce } from 'zod';

export const tokenSchema = object({
	code: string({
		required_error: 'Verification token is required',
		invalid_type_error: 'Verification token must be a string',
	}).min(8, { message: 'Verification token must be 8 characters or longer' }),
	expires: coerce.date({
		required_error: 'Expire date is required',
		invalid_type_error: 'Expire date must be of type Date',
	}),
});

export type TokenSchema = TypeOf<typeof tokenSchema>;
