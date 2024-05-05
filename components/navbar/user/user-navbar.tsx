import type { FC } from 'react';

import Link from 'next/link';

import type { CustomUser } from '@/auth';
import { ThemeSwitcher } from '../../theme-switcher';
import { LogoutButton } from './logout-button';
import { MobileMenu } from './mobile-menu';
import { currentUser } from '@/lib/get-session';
import { getUserById } from '@/lib/db/users';
import { getAccountsById } from '@/lib/db/accounts';
import { default as translations } from '@/i18n/en.json';

export const UserNavbar: FC<CustomUser> = async ({}) => {
	const user = await currentUser();

	if (!user) return;

	const { accounts } = await getUserById(user.id);

	if (!accounts) return;

	const data = accounts.reduce((acc, item) => {
		if (acc.accountType === 'personal') {
			const { id, accountType } = item;

			// @ts-ignore
			acc[accountType] = id;
		}

		return acc;
	});

	// @ts-ignore
	const [account] = await getAccountsById(data.id);

	if (!account) return;

	const { title } = translations.dashboard.navbar;

	return (
		<header className='flex items-center justify-between border-b bg-background p-4 shadow md:justify-around'>
			<Link
				href={
					account.accountType === 'enterprise'
						? '/dashboard/enterprise'
						: '/dashboard'
				}
				className='text-2xl font-bold tracking-tight md:text-3xl'
				prefetch={false}
			>
				{title}
			</Link>

			<nav className='flex items-center gap-x-4 md:gap-x-8'>
				<ul className='flex items-center gap-x-8 font-medium'>
					{translations.navbar.user.links.map((link) => (
						<li className='hidden md:flex' key={link.href}>
							<Link href={link.href} prefetch={false}>
								{link.label}
							</Link>
						</li>
					))}
				</ul>
				<div className='flex items-center gap-x-2 md:gap-x-4'>
					<ThemeSwitcher />
					<LogoutButton />
					<MobileMenu />
				</div>
			</nav>
		</header>
	);
};
