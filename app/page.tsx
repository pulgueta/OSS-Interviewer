/* eslint-disable prettier/prettier */
/* eslint-disable tailwindcss/no-contradicting-classname */
/* eslint-disable tailwindcss/classnames-order */

import { Link } from 'next-view-transitions';

import { buttonVariants } from '@/components/ui/button';
import { landing } from '@/i18n/en.json';

const Home = () => {
	return (
		<main className='container relative flex size-full min-h-svh flex-col items-center justify-center p-4'>
			<div className='absolute -top-28 -z-10 size-72 bg-color/30 blur-3xl md:size-96' />
			<h1 className='mb-4 animate-fade-down text-balance text-center text-4xl font-extrabold leading-9 tracking-tighter animate-duration-[1500ms] animate-ease-in-out md:text-5xl lg:text-6xl'>
				{landing.hero.title}
			</h1>
			<h2 className='mb-4 animate-fade-down text-balance text-center text-xl font-semibold leading-6 tracking-tight animate-delay-700 animate-duration-[1500] animate-ease-in-out md:text-2xl lg:text-3xl'>
				{landing.hero.description}
			</h2>
			<section className='flex w-full animate-fade flex-col items-center justify-center gap-4 animate-delay-1000 animate-duration-[1300] md:flex-row md:gap-2'>
				<Link
					href='/register'
					prefetch={false}
					className={buttonVariants({
						variant: 'color',
						className: 'w-full md:w-auto',
					})}
				>
					{landing.hero.cta}
				</Link>
				<Link
					href='/contact'
					prefetch={false}
					className={buttonVariants({
						variant: 'default',
						className: 'w-full md:w-auto',
					})}
				>
					{landing.hero.contact}
				</Link>
			</section>

			<div
				className='fixed inset-0 -z-20 h-screen w-screen animate-move-background bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_48px]'
				aria-hidden
			/>
		</main>
	);
};
export default Home;
