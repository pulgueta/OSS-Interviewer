import { Link } from 'next-view-transitions';
import { ChevronLeftIcon } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { CreateInterviewForm } from '@/components/form/user/create-interview';
import { default as translations } from '@/i18n/en.json';

const Create = () => {
	const { create_interview } = translations;

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
					{create_interview.go_back}
				</Link>
				<h1
					style={{ viewTransitionName: 'create-interview' }}
					className='mb-4 text-3xl font-bold tracking-tighter'
				>
					{create_interview.title}
				</h1>
				<CreateInterviewForm />
			</div>
		</div>
	);
};
export default Create;
