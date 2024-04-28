import { hash, verify } from 'argon2';
import { customAlphabet } from 'nanoid';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { env } from '@/env.server';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const encrypt = async (value: string | Buffer) =>
	await hash(value, {
		memoryCost: 8192,
		secret: Buffer.from(env.ARGON_SECRET),
	});

export const decrypt = async (hash: string, value: string | Buffer) =>
	await verify(hash, value, {
		secret: Buffer.from(env.ARGON_SECRET),
	});

const nanoid = customAlphabet(
	'123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
);

export const prefixes = {
	user: 'user',
	teams: 'teams',
	account: 'account',
	token: 'token',
} as const;

export const createId = (prefix: keyof typeof prefixes): string =>
	[prefixes[prefix], nanoid(32)].join('_');
