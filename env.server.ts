import { string } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
	server: {
		DATABASE_URL: string().url(),
		UPSTASH_REDIS_REST_URL: string().url(),
		UPSTASH_REDIS_REST_TOKEN: string().min(32),
	},
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
		UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
	},
});
