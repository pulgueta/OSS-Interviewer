import type { NextPage } from 'next';

type PricingParams = {
	searchParams: {
		pr: 'personal' | 'team';
	};
};

const Pricing: NextPage<PricingParams> = ({ searchParams }) => {
	return (
		<main className='flex min-h-[200vh] flex-col items-center justify-between p-24'>
			<h1 className='text-center text-3xl font-bold'>
				Pricing: {searchParams.pr}
			</h1>
		</main>
	);
};
export default Pricing;
