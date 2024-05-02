'use client';

import { useTransition } from 'react';

import { LoaderIcon, LogOutIcon } from 'lucide-react';

import { Button } from '../../ui/button';
import { logout } from '../actions/logout';
import { default as translations } from '@/i18n/en.json';

export const LogoutButton = () => {
	const [isPending, startTransition] = useTransition();

	const onLogout = () => startTransition(async () => await logout());

	return (
		<form action={onLogout}>
			<Button variant='destructive' size='icon' disabled={isPending}>
				{isPending ? (
					<LoaderIcon className='size-[1.2rem] animate-spin' />
				) : (
					<LogOutIcon
						className='size-[1.2rem]'
						aria-label={
							isPending
								? translations.navbar.loggingOut
								: translations.navbar.logout
						}
					/>
				)}
			</Button>
		</form>
	);
};
