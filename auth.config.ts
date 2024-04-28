import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { getUserByEmail } from '@/lib/db/users';
import { decrypt } from '@/lib/utils';
import { loginSchema } from '@/schemas/loginSchema';

export default {
	providers: [
		Credentials({
			authorize: async (credentials) => {
				const validatedFields = loginSchema.safeParse(credentials);

				if (validatedFields.success) {
					const { email, password } = validatedFields.data;

					const user = await getUserByEmail(email);

					if (!user) return null;

					const passwordsMatch = await decrypt(
						user.password,
						password,
					);

					if (passwordsMatch) return user;
				}

				return {};
			},
		}),
	],
} satisfies NextAuthConfig;
