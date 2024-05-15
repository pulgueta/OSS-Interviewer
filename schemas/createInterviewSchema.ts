import { type TypeOf, object, string, z } from 'zod';

import { default as translations } from '@/i18n/en.json';

const { title, jobDescription, jobTitle, yearsOfExperience } =
	translations.dashboard.createInterview.schema;

export const interviewSchema = object({
	title: string({
		invalid_type_error: title.invalidTypeError,
		required_error: title.emptyError,
	})
		.min(title.minLength, title.minLengthError)
		.max(title.maxLength, title.maxLengthError),
	jobTitle: string({
		invalid_type_error: jobTitle.invalidTypeError,
		required_error: jobTitle.emptyError,
	})
		.min(jobTitle.minLength, jobTitle.minLengthError)
		.max(jobTitle.maxLength, jobTitle.maxLengthError),
	yearsOfExperience: z.coerce
		.number({
			invalid_type_error: yearsOfExperience.invalidTypeError,
			required_error: yearsOfExperience.emptyError,
		})
		.min(yearsOfExperience.minLength, yearsOfExperience.minLengthError)
		.max(yearsOfExperience.maxLength, yearsOfExperience.maxLengthError),
	jobDescription: string({
		required_error: jobDescription.emptyError,
		invalid_type_error: jobDescription.invalidTypeError,
	})
		.min(jobDescription.minLength, jobDescription.minLengthError)
		.max(jobDescription.maxLength, jobDescription.maxLengthError),
});
export type Interview = TypeOf<typeof interviewSchema>;
