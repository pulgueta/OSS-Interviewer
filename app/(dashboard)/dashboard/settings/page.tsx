import { Link } from 'next-view-transitions';
import { ChevronLeftIcon } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { default as translations } from '@/i18n/en.json';

const Settings = () => {
	const { settings } = translations;

	return (
		<div className='flex min-h-[92.3dvh] flex-col items-start justify-start p-4'>
			<div className='mx-auto w-full max-w-5xl'>
				<Link
					style={{ viewTransitionName: 'dashboard-title' }}
					href='/dashboard'
					className={buttonVariants({ variant: 'link' })}
				>
					<ChevronLeftIcon
						className='mr-2 size-4'
						aria-label='Go back'
					/>
					{settings.go_back}
				</Link>
				<h1
					style={{ viewTransitionName: 'settings-page' }}
					className='text-3xl font-bold tracking-tighter'
				>
					{settings.title}
				</h1>
			</div>
		</div>
	);
};
export default Settings;
