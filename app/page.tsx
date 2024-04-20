/* eslint-disable prettier/prettier */
/* eslint-disable tailwindcss/no-contradicting-classname */
/* eslint-disable tailwindcss/classnames-order */

import { Link } from 'next-view-transitions';

import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { landing } from '@/i18n/en.json';

const Home = () => {
	return (
		<>
			<main className='container relative flex size-full min-h-svh flex-col items-center justify-center p-4'>
				<div className='absolute -top-28 -z-10 size-72 bg-color/30 blur-3xl md:size-96' />

				<h1 className='mb-4 animate-fade-down text-balance text-center text-4xl font-extrabold leading-9 tracking-tighter animate-duration-[1500ms] animate-ease-in-out md:text-5xl lg:text-6xl'>
					{landing.hero.title}
				</h1>
				<h2 className='mb-4 animate-fade-down text-balance text-center text-xl font-semibold leading-6 tracking-tight animate-delay-700 animate-duration-[1500] animate-ease-in-out md:text-2xl lg:text-3xl'>
					{landing.hero.description}
				</h2>
				<section className='flex w-full animate-fade flex-col items-center justify-center gap-4 animate-delay-1000 animate-duration-[1300] md:flex-row'>
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

			<section className='rounded border bg-background/80 px-6 py-12 backdrop-blur'>
				<div className='container flex flex-col items-center justify-center'>
					<span className='mb-6 rounded-full border bg-primary-foreground px-4 py-2 font-normal tracking-normal shadow-lg shadow-black/20 dark:shadow-neutral-600/50'>
						{landing.second.badges.practicing}
					</span>
					<h3 className='mb-4 text-balance text-center text-3xl font-bold leading-7 tracking-tighter'>
						{landing.second.personal.title}
					</h3>
					<p className='text-pretty text-center text-lg font-normal leading-6 tracking-tight md:max-w-prose'>
						{landing.second.personal.description}
					</p>
				</div>

				<Separator className='mx-auto my-8 max-w-screen-xl' />

				<div className='container flex flex-col items-center justify-center'>
					<span className='mb-6 rounded-full border border-primary/20 bg-color px-4 py-2 font-normal tracking-normal text-color-foreground shadow-lg shadow-color'>
						{landing.second.badges.hiring}
					</span>
					<h3 className='mb-4 text-balance text-center text-3xl font-bold leading-7 tracking-tighter'>
						{landing.second.enterprise.title}
					</h3>
					<p className='text-pretty text-center text-lg font-normal leading-6 tracking-tight md:max-w-prose'>
						{landing.second.enterprise.description}
					</p>
				</div>
			</section>
		</>
	);
};
export default Home;
