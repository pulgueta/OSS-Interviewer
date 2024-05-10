import NextAuth, { type DefaultSession } from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';

import { db } from '@/db';
import type { UserSelect } from '@/db/schema';
import { getUserByEmail } from '@/lib/db/users';
import authConfig from './auth.config';
import { env } from './env.server';

export type CustomUser = DefaultSession['user'] & {
	id: UserSelect['id'];
	username: UserSelect['username'];
	firstName: UserSelect['firstName'];
	lastName: UserSelect['lastName'];
	email: UserSelect['email'];
	role: UserSelect['role'];
	photoURL: UserSelect['photoURL'];
};

declare module 'next-auth' {
	export interface Session {
		user: CustomUser;
	}
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
	debug: process.env.NODE_ENV === 'development',
	jwt: {
		maxAge: 5 * 24 * 60 * 60,
	},
	callbacks: {
		jwt: async ({ token }) => {
			if (!token.sub) return token;

			const currentUser = await getUserByEmail(token.email!);

			if (!currentUser) return token;

			token.id = currentUser.id;
			token.username = currentUser.username;
			token.firstName = currentUser.firstName;
			token.lastName = currentUser.lastName;
			token.email = currentUser.email;
			token.role = currentUser.role;
			token.photoURL = currentUser.photoURL;

			return token;
		},
		session: async ({ session, token }) => {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}

			if (session.user) {
				session.user.id = token.id as UserSelect['id'];
				session.user.username =
					token.username as UserSelect['username'];
				session.user.firstName =
					token.firstName as UserSelect['firstName'];
				session.user.lastName =
					token.lastName as UserSelect['lastName'];
				session.user.email = token.email as UserSelect['email'];
				session.user.role = token.role as UserSelect['role'];
				session.user.photoURL =
					token.photoURL as UserSelect['photoURL'];
			}

			return session;
		},
		authorized: ({ auth, request }) => {
			const isLogged = !!auth;
			const isDashboardRoute =
				request.nextUrl.pathname.startsWith('/dashboard');
			const isAuthRoute =
				request.nextUrl.pathname.startsWith('/login') ||
				request.nextUrl.pathname.startsWith('/register') ||
				request.nextUrl.pathname.startsWith('/reset-password');

			if (isAuthRoute && isLogged) {
				return Response.redirect(
					request.url.replace(request.nextUrl.pathname, '/dashboard'),
				);
			}

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
