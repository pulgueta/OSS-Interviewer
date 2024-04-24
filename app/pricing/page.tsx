import type { NextPage } from 'next';

import { SwitchPricing } from '@/components/pricing/switch-pricing';

type PricingParams = {
	searchParams: {
		pr: 'personal' | 'enterprise';
	};
};

const Pricing: NextPage<PricingParams> = ({ searchParams }) => {
	return (
		<main className='flex min-h-svh flex-col items-center justify-around p-16'>
			<div className='flex w-full flex-col items-center justify-center rounded-md border bg-background p-4 md:container'>
				<span className='my-6 rounded-full border border-primary-foreground/20 bg-primary px-4 py-2 font-normal tracking-normal text-primary-foreground shadow-md shadow-primary'>
					Our pricing:
				</span>

				<SwitchPricing type={searchParams.pr} />
			</div>
		</main>
	);
};
export default Pricing;
