'use client';

import { type FC, useState } from 'react';

import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { pricingData } from './pricing';
import { PricingCard } from './pricing-card';

type CheckedSwitch = {
	type?: 'personal' | 'enterprise';
};

export const SwitchPricing: FC<CheckedSwitch> = ({ type = undefined }) => {
	const isChecked = type === 'personal' || type === undefined ? false : true;

	const [personal, setPersonal] = useState<boolean>(isChecked);

	return (
		<>
			<div className='mb-4 flex items-center space-x-4'>
				<Label htmlFor='pricing-mode'>Personal</Label>
				<Switch
					id='pricing-mode'
					checked={personal}
					onCheckedChange={() => setPersonal((prev) => !prev)}
				/>
				<Label htmlFor='pricing-mode'>Enterprise</Label>
			</div>

			<div className='flex w-full flex-col items-center justify-center gap-4 md:flex-row md:flex-wrap md:gap-8 lg:gap-16'>
				{!personal
					? pricingData.map(
							(plan) =>
								plan.type === 'personal' && (
									<PricingCard key={plan.title} {...plan} />
								),
						)
					: pricingData.map(
							(plan) =>
								plan.type === 'enterprise' && (
									<PricingCard key={plan.title} {...plan} />
								),
						)}
			</div>
		</>
	);
};
