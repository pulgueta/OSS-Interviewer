import type { NextRequest } from 'next/server';

import { AuthError } from 'next-auth';

import { ratelimiter } from '@/lib/ratelimiter';
import { getUserByEmail } from '@/lib/db/users';
import { signIn } from '@/auth';
import { loginSchema } from '@/schemas/loginSchema';
import { default as translations } from '@/i18n/en.json';

export const POST = async (req: NextRequest) => {
	const ip = req.ip ?? '127.0.0.1';

	const allowed = await ratelimiter.limit(ip);

	const { _200, _400, _401, _404, _500 } = translations.login.api;
	const { api } = translations;

	if (!allowed.success) {
		return Response.json({ message: api._429 }, { status: 429 });
	}

	const rawBody = await req.json();

	const body = loginSchema.safeParse(rawBody);

	const errors = body.error?.errors.map((error) => ({
		input: error.path[0],
		message: error.message,
	}));

	if (!body.success) {
		return Response.json(
			{
				message: _400,
				errors,
			},
			{ status: 400 },
		);
	}

	const { email, password } = body.data;

	try {
		const user = await getUserByEmail(email);

		if (!user) {
			return Response.json({ message: _404 }, { status: 404 });
		}

		if (!user.emailVerified) {
			return Response.json(
				{ message: _401.noEmailVerified },
				{ status: 401 },
			);
		}

		try {
			await signIn('credentials', {
				email,
				password,
				redirectTo: '/dashboard',
				redirect: true,
			});
		} catch (error) {
			if (error instanceof AuthError) {
				switch (error.type) {
					case 'CredentialsSignin':
						return Response.json(
							{
								message: _401.invalidCredentials,
							},
							{ status: 401 },
						);
					case 'AccessDenied':
						return Response.json(
							{ message: _401.accessDenied },
							{ status: 401 },
						);
					default:
						return Response.json(
							{ message: _500 },
							{ status: 500 },
						);
				}
			}

			throw error;
		}

		return Response.json({ message: _200 }, { status: 200 });
	} catch (error) {
		if (error instanceof Error) {
			return Response.json({ message: _500, error }, { status: 500 });
		}
	}
};
