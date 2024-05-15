import Link from 'next/link';

import { ThemeSwitcher } from '../../theme-switcher';
import { LogoutButton } from './logout-button';
import { MobileMenu } from './mobile-menu';
import { currentUser } from '@/lib/get-session';
import { getUserByEmail } from '@/lib/db/users';
import { buttonVariants } from '@/components/ui/button';
import { getAccountsById } from '@/lib/db/accounts';
import { default as translations } from '@/i18n/en.json';

export const UserNavbar = async () => {
	const user = await currentUser();

	if (!user) return;

	const { accounts } = await getUserByEmail(user.email);

	if (!accounts) return;

	const data = accounts.reduce((acc: { [key: string]: string }, item) => {
		if (acc.accountType === 'personal') {
			const { id, accountType } = item;

			acc[accountType] = id;
		}

		return acc;
	}, {});

	const account = await getAccountsById(data.id);

	if (!account) return;

	const { title } = translations.dashboard.navbar;
	const { links } = translations.navbar.user;

	const href =
		account.accountType === 'enterprise'
			? '/dashboard/enterprise'
			: '/dashboard';

	return (
		<header className='flex items-center justify-between border-b bg-background p-4 shadow md:justify-around'>
			<Link
				href={href}
				className='text-3xl font-extrabold tracking-tighter'
				prefetch={false}
			>
				{title}
			</Link>

			<nav className='flex items-center gap-x-4 md:gap-x-8'>
				<ul className='flex items-center gap-x-4 font-medium'>
					{links.map((link) => (
						<li className='hidden md:flex' key={link.href}>
							<Link
								href={link.href}
								prefetch={false}
								className={buttonVariants({
									variant: 'ghost',
								})}
							>
								{link.label}
							</Link>
						</li>
					))}
					<ThemeSwitcher />
					<LogoutButton />
					<MobileMenu />
				</ul>
			</nav>
		</header>
	);
};
