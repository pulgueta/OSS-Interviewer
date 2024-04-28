import NextAuth from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';

import { db } from '@/db';
import authConfig from './auth.config';
import { env } from './env.server';

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
	unstable_update: update,
} = NextAuth({
	pages: {
		signIn: '/login',
		newUser: '/register',
	},
	adapter: DrizzleAdapter(db),
	secret: env.AUTH_SECRET,
	session: { strategy: 'jwt' },
	useSecureCookies: process.env.NODE_ENV === 'production',
	...authConfig,
});
