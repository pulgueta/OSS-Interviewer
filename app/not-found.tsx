import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { default as translations } from '@/i18n/en.json';

const NotFound = () => {
	return (
		<div className='flex min-h-dvh flex-col items-center justify-center px-4 md:px-6 lg:px-8'>
			<div className='max-w-xl space-y-6 text-center'>
				<h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>
					{translations._404.title}
				</h1>
				<p className='text-lg text-muted-foreground'>
					{translations._404.description}
				</p>
				<Link className={buttonVariants()} href='/'>
					{translations._404.link}
				</Link>
			</div>
		</div>
	);
};
export default NotFound;
