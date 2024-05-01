import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from '@/db/schema';
import { env } from '@/env.server';

const sql = neon(env.DATABASE_URL);
export const db = drizzle(sql, { schema });
