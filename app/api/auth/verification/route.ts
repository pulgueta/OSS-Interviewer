import type { NextRequest } from 'next/server';

import { ratelimiter } from '@/lib/ratelimiter';
import { tokenSchema } from '@/schemas/tokenSchema';
import { default as translations } from '@/i18n/en.json';

export const POST = async (req: NextRequest) => {
	const ip = req.ip ?? '127.0.0.1';

	const allowed = await ratelimiter.limit(ip);

	const { api } = translations;
	const { _200, _400 } = translations.register.api;

	if (!allowed.success) {
		return Response.json({ message: api._429 }, { status: 429 });
	}

	const rawBody = await req.json();

	const body = tokenSchema.safeParse(rawBody);

	const errors = body.error?.errors.map((error) => ({
		input: error.path[0],
		message: error.message,
	}));

	if (!body.success) {
		return Response.json({ message: api._400, errors }, { status: 400 });
	}

	const { code, expires } = body.data;

	const isTokenInvalid = expires.toISOString() < new Date().toISOString();

	if (isTokenInvalid) {
		return Response.json({ message: _400.tokenExpired }, { status: 400 });
	}

	return Response.json(
		{ message: _200, data: { emailId: crypto.randomUUID(), code } },
		{ status: 200 },
	);
};
