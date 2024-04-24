import type { FC, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

interface $BaseForm extends PropsWithChildren {
	header: string;
	description?: string;
	separator?: boolean;
}

export const BaseForm: FC<$BaseForm> = ({
	children,
	header,
	description,
	separator,
}) => {
	return (
		<article className='w-full rounded-xl border bg-background p-4 shadow md:max-w-xl'>
			<header
				className={cn('mb-2 p-2', {
					'border-b pb-2': separator,
				})}
			>
				<h3 className='text-xl font-bold tracking-tighter md:text-2xl lg:text-3xl lg:font-extrabold'>
					{header}
				</h3>
				{description && (
					<p className='text-sm text-muted-foreground'>
						{description}
					</p>
				)}
			</header>
			<section className='w-full p-2'>{children}</section>
		</article>
	);
};
