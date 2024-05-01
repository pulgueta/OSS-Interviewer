import { FC } from 'react';

import { Link } from 'next-view-transitions';
import { CheckCircle } from 'lucide-react';

import { buttonVariants } from '../ui/button';

type Pricing = {
	title: string;
	description: string;
	price: number;
	features: string[];
};

export const PricingCard: FC<Pricing> = ({
	description,
	price,
	title,
	features,
}) => {
	const formattedPrice = new Intl.NumberFormat('en-US', {
		currency: 'USD',
		style: 'currency',
	}).format(price);

	return (
		<article className='w-full rounded border bg-secondary/40 p-4 md:max-w-80'>
			<header className='text-center text-4xl font-black tracking-tighter'>
				{title}
			</header>
			<p className='my-2 text-pretty text-center text-sm text-muted-foreground'>
				{description}
			</p>
			<span className='block border-b pb-2 text-center text-2xl font-extrabold tracking-tighter md:text-3xl'>
				{price !== 0 ? (
					<>
						{formattedPrice}
						<span className='text-sm font-normal text-muted-foreground lg:text-base'>
							/mo
						</span>
					</>
				) : (
					'Free'
				)}
			</span>
			<ul className='my-4 space-y-1'>
				{features.map((feature, i) => (
					<li className='flex w-full items-center gap-x-2' key={i}>
						<CheckCircle className='max-h-4 min-h-4 min-w-4 max-w-4 shrink-0 text-emerald-500' />
						<span className='text-pretty'>{feature}</span>
					</li>
				))}
			</ul>
			<footer className='border-t pt-4'>
				<Link
					style={{ viewTransitionName: title }}
					href='/pricing'
					className={buttonVariants({ className: 'w-full' })}
				>
					Get started
				</Link>
			</footer>
		</article>
	);
};
