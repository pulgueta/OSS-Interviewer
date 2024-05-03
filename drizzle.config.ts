import type { Config } from 'drizzle-kit';

import { env } from './env.server';

export default {
	schema: './db/schema',
	out: './db/migrations',
	driver: 'pg',
	dbCredentials: {
		connectionString: env.DATABASE_URL,
	},
} satisfies Config;
