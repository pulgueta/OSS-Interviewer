import { type TypeOf, object, string } from 'zod';

import { default as translations } from '@/i18n/en.json';

const { username, email, firstName, lastName, password, confirmPassword } =
	translations.register.schema;

export const registerSchema = object({
	username: string({
		invalid_type_error: username.invalidTypeError,
		required_error: username.emptyError,
	})
		.min(username.minLength, username.minLengthError)
		.max(username.maxLength, username.maxLengthError),
	firstName: string({
		invalid_type_error: firstName.invalidTypeError,
		required_error: firstName.emptyError,
	})
		.min(firstName.minLength, firstName.minLengthError)
		.max(firstName.maxLength, firstName.maxLengthError),
	lastName: string({
		invalid_type_error: lastName.invalidTypeError,
		required_error: lastName.emptyError,
	})
		.min(lastName.minLength, lastName.minLengthError)
		.max(lastName.maxLength, lastName.maxLengthError),
	email: string({
		required_error: email.emptyError,
		invalid_type_error: email.invalidTypeError,
	})
		.min(email.minLength, email.minLengthError)
		.max(email.maxLength, email.maxLengthError)
		.email({ message: email.invalidTypeError }),
	password: string({
		required_error: password.emptyError,
		invalid_type_error: password.invalidTypeError,
	})
		.min(password.minLength, password.minLengthError)
		.max(password.maxLength, password.maxLengthError),
	confirmPassword: string({
		required_error: confirmPassword.emptyError,
		invalid_type_error: confirmPassword.invalidTypeError,
	})
		.min(confirmPassword.minLength, confirmPassword.minLengthError)
		.max(confirmPassword.maxLength, confirmPassword.maxLengthError),
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
	message: confirmPassword.matcher,
	path: ['confirmPassword'],
});

export type Register = TypeOf<typeof registerSchema>;
