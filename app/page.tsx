/* eslint-disable prettier/prettier */
/* eslint-disable tailwindcss/no-contradicting-classname */
/* eslint-disable tailwindcss/classnames-order */

import { Link } from 'next-view-transitions';

import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SwitchPricing } from '@/components/pricing/switch-pricing';
import { default as translations } from '@/i18n/en.json';

const Home = () => {
	return (
		<>
			<main className='container relative flex size-full min-h-svh flex-col items-center justify-center overflow-x-hidden p-2 md:p-4'>
				<div
					className='absolute -top-28 -z-10 size-72 animate-pulse bg-color/20 blur-3xl md:size-96'
					aria-hidden
				/>
				<div
					className='absolute -left-96 bottom-0 -z-10 size-72 animate-pulse bg-rose-400/10 blur-3xl md:size-72'
					aria-hidden
				/>

				<h1 className='mb-4 animate-fade-down text-balance text-center text-4xl font-extrabold leading-9 tracking-tighter animate-duration-[1500ms] animate-ease-in-out md:text-5xl lg:text-6xl'>
					{translations.landing.hero.title}
				</h1>
				<h2 className='mb-4 animate-fade-down text-balance text-center text-xl font-semibold leading-6 tracking-tight animate-delay-700 animate-duration-[1500] animate-ease-in-out md:text-2xl lg:text-3xl'>
					{translations.landing.hero.description}
				</h2>
				<section className='flex w-full animate-fade flex-col items-center justify-center gap-4 animate-delay-1000 animate-duration-[1300] md:flex-row'>
					<Link
						style={{ viewTransitionName: 'register' }}
						href='/register'
						prefetch={false}
						className={buttonVariants({
							variant: 'color',
							className: 'w-full md:w-auto',
						})}
					>
						{translations.landing.hero.cta}
					</Link>
					<Link
						style={{ viewTransitionName: 'contact' }}
						href='/contact'
						prefetch={false}
						className={buttonVariants({
							variant: 'default',
							className: 'w-full md:w-auto',
						})}
					>
						{translations.landing.hero.contact}
					</Link>
				</section>

				<div
					className='fixed inset-0 -z-20 h-screen w-screen animate-move-background bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_48px]'
					aria-hidden
				/>
			</main>

			<section className='mb-16 rounded border bg-background/80 px-0 py-12 backdrop-blur md:px-2 lg:px-0'>
				<div className='container flex flex-col items-center justify-center'>
					<span className='mb-6 rounded-full border bg-primary-foreground px-4 py-2 font-normal tracking-normal shadow-lg shadow-black/20 dark:shadow-neutral-600/50'>
						{translations.landing.second.badges.practicing}
					</span>
					<h3 className='mb-4 text-balance text-center text-3xl font-bold leading-7 tracking-tighter'>
						{translations.landing.second.personal.title}
					</h3>
					<p className='text-pretty text-center text-lg font-normal leading-6 tracking-tight md:max-w-prose'>
						{translations.landing.second.personal.description}
					</p>
				</div>

				<Separator className='mx-auto my-8 max-w-screen-xl' />

				<div className='container flex flex-col items-center justify-center'>
					<span className='mb-6 rounded-full border border-primary/20 bg-color px-4 py-2 font-normal tracking-normal text-color-foreground shadow-lg shadow-color'>
						{translations.landing.second.badges.hiring}
					</span>
					<h3 className='mb-4 text-balance text-center text-3xl font-bold leading-7 tracking-tighter'>
						{translations.landing.second.enterprise.title}
					</h3>
					<p className='text-pretty text-center text-lg font-normal leading-6 tracking-tight md:max-w-prose'>
						{translations.landing.second.enterprise.description}
					</p>
				</div>
			</section>
			<section className='container mb-8 rounded-md border bg-background p-2 shadow md:p-4'>
				<div className='flex w-full flex-col items-center justify-center p-4'>
					<span className='mb-8 rounded-full border border-primary-foreground/20 bg-primary px-4 py-2 font-normal tracking-normal text-primary-foreground shadow-md shadow-primary'>
						Our pricing:
					</span>

					<SwitchPricing />
				</div>
			</section>
			<section className='w-full py-12 md:py-24 lg:py-32'>
				<div className='container flex flex-col items-center justify-center gap-4 px-4 md:px-6'>
					<div className='space-y-3 text-center'>
						<h2 className='text-3xl font-extrabold tracking-tighter md:text-4xl'>
							Ready to get started?
						</h2>
						<p className='max-w-prose tracking-tight text-gray-500 dark:text-gray-400 md:text-xl'>
							Experience the best interviewing flow within
							minutes!
						</p>
					</div>
					<div className='grid max-w-sm gap-2 min-[400px]:grid-flow-col'>
						<Link
							style={{ viewTransitionName: 'register' }}
							className={buttonVariants({ variant: 'color' })}
							href='/register'
						>
							Create account
						</Link>
					</div>
				</div>
			</section>
		</>
	);
};
export default Home;
