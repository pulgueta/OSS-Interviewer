'use client';

import { Link } from 'next-view-transitions';

import { ThemeSwitcher } from '../theme-switcher';
import { buttonVariants } from '../ui/button';
import { MobileMenu } from './mobile-menu';
import { ClientNavigationMenu } from './client-navigation-menu';
import { navbar } from '@/i18n/en.json';

export const Navbar = () => {
	return (
		<header className='fixed z-20 flex w-full items-center justify-between border-b bg-background/85 p-4 backdrop-blur-sm md:justify-around'>
			<Link href='/' className='text-3xl font-black tracking-tighter'>
				{navbar.title}
			</Link>

			<nav className='flex items-center gap-x-4 md:gap-x-8'>
				<ul className='hidden md:flex md:items-center md:gap-x-6'>
					<li>
						<ClientNavigationMenu />
					</li>
					<li>
						<Link
							href={navbar.links.about.href}
							className='font-medium'
						>
							{navbar.links.about.label}
						</Link>
					</li>
					<li>
						<Link
							href={navbar.links.faq.href}
							className='font-medium'
						>
							{navbar.links.faq.label}
						</Link>
					</li>
				</ul>

				<Link
					href={navbar.links.get_started.href}
					className={buttonVariants({
						variant: 'color',
						className: 'hidden md:block',
					})}
				>
					{navbar.links.get_started.label}
				</Link>

				<MobileMenu />

				<ThemeSwitcher />
			</nav>
		</header>
	);
};
