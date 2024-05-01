import { type TypeOf, object, string } from 'zod';

import { default as translations } from '@/i18n/en.json';

const { email, password } = translations.login.schema;

export const loginSchema = object({
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
});

export type Login = TypeOf<typeof loginSchema>;
