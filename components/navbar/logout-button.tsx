'use client';

import { useTransition } from 'react';

import { PowerIcon } from 'lucide-react';

import { Button } from '../ui/button';
import { logout } from './actions/logout';

export const LogoutButton = () => {
	const [isPending, startTransition] = useTransition();

	const onLogout = () => startTransition(async () => await logout());

	return (
		<form action={onLogout}>
			<Button
				variant='destructive'
				disabled={isPending}
				className='w-full'
			>
				<PowerIcon className='mr-2 size-4' aria-label='Logout' />
				{isPending ? 'Logging out...' : 'Logout'}
			</Button>
		</form>
	);
};
