import { Link } from 'next-view-transitions';

import { Separator } from '../ui/separator';
import { X } from '../svg/x';
import { LinkedIn } from '../svg/linkedin';
import { Github } from '../svg/github';
import { og, navbar } from '@/i18n/en.json';

export const Footer = () => {
	const datetime = new Date().toLocaleDateString('en-US', {
		dateStyle: 'short',
	});

	const year = new Date().getFullYear().toString();

	return (
		<footer className='grid grid-cols-2 items-center justify-items-center rounded border bg-background px-4 py-6 md:p-8'>
			<Link
				href='/'
				className='text-2xl font-black tracking-tighter md:text-3xl'
			>
				{navbar.title}
			</Link>

			<div className='flex flex-col items-center gap-4'>
				<div className='flex items-center gap-x-4'>
					<Link
						href={navbar.links.pricing.href}
						className='text-sm font-medium tracking-tight md:text-base'
					>
						{navbar.links.pricing.label}
					</Link>
					<Link
						href={navbar.links.about.href}
						className='text-sm font-medium tracking-tight md:text-base'
					>
						{navbar.links.about.label}
					</Link>
					<Link
						href={navbar.links.faq.href}
						className='text-sm font-medium tracking-tight md:text-base'
					>
						{navbar.links.faq.label}
					</Link>
				</div>
			</div>

			<Separator className='col-span-2 mx-auto my-6 max-w-screen-xl' />

			<div className='col-span-2 flex w-full items-center justify-between md:justify-around'>
				<span className='text-sm text-muted-foreground'>
					&copy; <time dateTime={datetime}>{year}</time>{' '}
					{og.author.name}
				</span>

				<div className='flex items-center justify-around gap-x-4'>
					<a
						href='https://twitter.com/pulgueta_'
						rel='noopener noreferrer'
						target='_blank'
					>
						<X />
					</a>
					<a
						href='https://linkedin.com/in/and-rodr'
						rel='noopener noreferrer'
						target='_blank'
					>
						<LinkedIn />
					</a>
					<a
						href='https://github.com/pulgueta'
						rel='noopener noreferrer'
						target='_blank'
					>
						<Github />
					</a>
				</div>
			</div>
		</footer>
	);
};
