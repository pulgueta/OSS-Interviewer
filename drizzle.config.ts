import type { Config } from 'drizzle-kit';

import { env } from './env.server';

export default {
	schema: './db/schema',
	out: './db/migrations',
	dialect: 'postgresql',
	strict: true,
	verbose: true,
	dbCredentials: {
		url: env.DATABASE_URL,
	},
} satisfies Config;
