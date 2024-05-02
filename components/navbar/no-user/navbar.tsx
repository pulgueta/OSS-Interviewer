'use client';

import Link from 'next/link';

import { ThemeSwitcher } from '../../theme-switcher';
import { buttonVariants } from '../../ui/button';
import { MobileMenu } from './mobile-menu';
import { ClientNavigationMenu } from './client-navigation-menu';
import { default as translations } from '@/i18n/en.json';

export const Navbar = () => {
	return (
		<header className='fixed z-20 flex w-full items-center justify-between border-b bg-background/85 p-4 backdrop-blur-sm md:justify-around'>
			<Link href='/' className='text-3xl font-black tracking-tighter'>
				{translations.navbar.title}
			</Link>

			<nav className='flex items-center gap-x-4 md:gap-x-8'>
				<ul className='hidden md:flex md:items-center md:gap-x-6'>
					<li>
						<ClientNavigationMenu />
					</li>
					{translations.navbar.links.map((link) => (
						<li key={link.href}>
							<Link
								href={link.href}
								className='font-medium'
								prefetch={false}
							>
								{link.label}
							</Link>
						</li>
					))}
				</ul>

				<Link
					href={translations.navbar.get_started.href}
					prefetch={false}
					className={buttonVariants({
						variant: 'color',
						className: 'hidden md:block',
					})}
				>
					{translations.navbar.get_started.label}
				</Link>

				<MobileMenu />

				<ThemeSwitcher />
			</nav>
		</header>
	);
};
