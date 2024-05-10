import { Link } from 'next-view-transitions';
import { ChevronLeftIcon } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const Create = () => {
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
					Go back
				</Link>
				<h1
					style={{ viewTransitionName: 'create-interview' }}
					className='text-3xl font-bold tracking-tighter'
				>
					Create a new interview
				</h1>
				<form className='my-4 grid gap-4'>
					<Label>Full name</Label>
					<Input />
					<Label>Role you are applying for</Label>
					<Input />
					<Label>Years of experience</Label>
					<Input />

					<Button>Create interview</Button>
				</form>
			</div>
		</div>
	);
};
export default Create;
