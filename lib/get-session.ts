import { cache } from 'react';

import { auth } from '@/auth';

export const currentUser = cache(async () => {
	const session = await auth();

	if (!session?.user) {
		return;
	}

	return session.user;
});
