import type { NextRequest } from 'next/server';

import { ratelimiter } from '@/lib/ratelimiter';
import { createUser, getUserByEmail } from '@/lib/db/users';
import { registerSchema } from '@/schemas/registerSchema';

export const POST = async (req: NextRequest) => {
	const ip = req.ip ?? '127.0.0.1';

	const allowed = await ratelimiter.limit(ip);

	if (!allowed.success) {
		return Response.json(
			{ message: 'Too many requests!' },
			{ status: 429 },
		);
	}

	const rawBody = await req.json();

	const body = registerSchema.safeParse(rawBody);

	if (!body.success) {
		return Response.json({ message: 'Missing values' }, { status: 400 });
	}

	const userExists = await getUserByEmail(body.data.email);

	if (userExists) {
		return Response.json(
			{ message: 'Email is already taken' },
			{ status: 400 },
		);
	}

	const { confirmPassword, ...data } = body.data;

	await createUser({ ...data });

	return Response.json({ message: 'User created' }, { status: 200 });
};
