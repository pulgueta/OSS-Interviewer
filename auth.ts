import NextAuth from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';

import { db } from '@/db';
import type { UserSelect } from '@/db/schema';
import { getUserById } from '@/lib/db/users';
import authConfig from './auth.config';
import { env } from './env.server';

export interface CustomUser {
	id: UserSelect['id'];
	username: UserSelect['username'];
	firstName: UserSelect['firstName'];
	lastName: UserSelect['lastName'];
	email: UserSelect['email'];
	emailVerified: UserSelect['emailVerified'];
	role: UserSelect['role'];
	plan: UserSelect['plan'];
	photoURL: UserSelect['photoURL'];
	createdAt: UserSelect['createdAt'];
	updatedAt: UserSelect['updatedAt'];
}

declare module 'next-auth' {
	// eslint-disable-next-line no-unused-vars
	interface Session extends CustomUser {}
}

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
	jwt: {
		maxAge: 5 * 24 * 60 * 60,
	},
	callbacks: {
		jwt: async ({ token }) => {
			if (!token.sub) return token;

			const currentUser = await getUserById(token.sub);

			if (!currentUser) return token;

			token.id = currentUser.id;
			token.username = currentUser.username;
			token.firstName = currentUser.firstName;
			token.lastName = currentUser.lastName;
			token.email = currentUser.email;
			token.emailVerified = currentUser.emailVerified;
			token.role = currentUser.role;
			token.plan = currentUser.plan;
			token.photoURL = currentUser.photoURL;
			token.createdAt = currentUser.createdAt;
			token.updatedAt = currentUser.updatedAt;

			return token;
		},
		session: async ({ session, token }) => {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}

			return session;
		},
		authorized: async ({ auth, request }) => {
			const isLogged = !!auth?.user;
			const isDashboardRoute =
				request.nextUrl.pathname.startsWith('/dashboard');

			if (isDashboardRoute) {
				if (isLogged) return true;

				return false;
			} else if (isLogged) {
				return Response.redirect(
					new URL('/dashboard', request.nextUrl),
				);
			}

			return true;
		},
	},
	...authConfig,
});
