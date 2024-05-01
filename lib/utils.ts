import { hash, compare } from 'bcryptjs';
import { customAlphabet } from 'nanoid';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const encrypt = async (value: string) => await hash(value, 16);

export const decrypt = async (hash: string, value: string) =>
	await compare(value, hash);

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
