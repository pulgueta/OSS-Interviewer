import type { NextRequest } from 'next/server';

import { ratelimiter } from '@/lib/ratelimiter';
import { createUser, updateUserAccounts, getUserByEmail } from '@/lib/db/users';
import { createAccount } from '@/lib/db/accounts';
import { createToken } from '@/lib/db/verificationToken';
import { registerSchema } from '@/schemas/registerSchema';
import { default as translations } from '@/i18n/en.json';

export const POST = async (req: NextRequest) => {
	const ip = req.ip ?? '127.0.0.1';

	const allowed = await ratelimiter.limit(ip);

	const { _201, _400, _500, external } = translations.register.api;
	const { api } = translations;

	if (!allowed.success) {
		return Response.json({ message: api._429 }, { status: 429 });
	}

	const rawBody = await req.json();

	const body = registerSchema.safeParse(rawBody);

	const errors = body.error?.errors.map((error) => ({
		input: error.path[0],
		message: error.message,
	}));

	if (!body.success) {
		return Response.json(
			{
				message: _400.invalidInput,
				errors,
			},
			{ status: 400 },
		);
	}

	const userExists = await getUserByEmail(body.data.email);

	if (userExists) {
		return Response.json({ message: _400.emailTaken }, { status: 400 });
	}

	// eslint-disable-next-line no-unused-vars
	const { confirmPassword, ...rest } = body.data;

	try {
		// eslint-disable-next-line no-unused-vars
		const { password, ...user } = await createUser({
			...rest,
		});

		const account = await createAccount({ profileId: user.id! });

		await updateUserAccounts(user.id!, {
			accountType: account.accountType,
			id: account.id,
			profileId: account.profileId!,
		});

		const expires = new Date(Date.now() + 30 * 60 * 1000);

		const token = await createToken({
			expires,
			userId: user.id as string,
		});

		const q = await fetch(`${req.nextUrl.origin}/api/auth/verification`, {
			method: 'POST',
			body: JSON.stringify(token),
		});

		if (!q.ok) {
			return Response.json({ message: external }, { status: q.status });
		}

		return Response.json({ message: _201 }, { status: 201 });
	} catch (error) {
		console.log(error);
		if (error instanceof Error) {
			return Response.json(
				{
					message: _500,
					error,
				},
				{ status: 500 },
			);
		}
	}
};
