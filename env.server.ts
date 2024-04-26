import { string } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
	server: {
		DATABASE_URL: string().url(),
		UPSTASH_REDIS_REST_URL: string().url(),
		UPSTASH_REDIS_REST_TOKEN: string().min(32),
		ARGON_SECRET: string().min(
			process.env.NODE_ENV === 'production' ? 128 : 64,
		),
	},
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
		UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
		ARGON_SECRET: process.env.ARGON_SECRET,
	},
	onValidationError: (error) => {
		console.error(
			'❌ Invalid environment variables:',
			error.flatten().fieldErrors,
		);

		throw new Error('Invalid environment variables');
	},
	onInvalidAccess: () => {
		throw new Error(
			'❌ Attempted to access a server-side environment variable on the client',
		);
	},
});
