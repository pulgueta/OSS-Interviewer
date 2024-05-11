import { Link } from 'next-view-transitions';
import { PlusIcon, SettingsIcon } from 'lucide-react';

import { AccountsTable } from './components/accounts-table';
import { Button, buttonVariants } from '@/components/ui/button';
import { Illustration } from '@/components/svg/illustration';
import { Separator } from '@/components/ui/separator';
import { currentUser } from '@/lib/get-session';
import { getUserByEmail } from '@/lib/db/users';
import { getAccountsById } from '@/lib/db/accounts';
import { default as translations } from '@/i18n/en.json';

const Dashboard = async () => {
	const { dashboard } = translations;

	const user = await currentUser();

	if (!user) return;

	const { accounts } = await getUserByEmail(user.email);

	if (!accounts) return;

	const data = accounts.reduce((acc, item) => {
		if (acc.accountType === 'personal') {
			const { id, accountType } = item;

			// @ts-ignore
			acc[accountType] = id;
		}

		return acc;
	});

	// @ts-ignore
	const [account] = await getAccountsById(data.id);

	return (
		<main className='flex min-h-[92.3dvh] flex-col items-start justify-start p-4'>
			<header className='container rounded border-b pb-4'>
				<h1
					style={{ viewTransitionName: 'dashboard-title' }}
					className='text-balance text-3xl font-bold tracking-tighter md:text-4xl'
				>
					{dashboard.welcome.replace('{{name}}', user.firstName)}
				</h1>
			</header>
			<section className='container my-4 flex w-full flex-col justify-between gap-8 border-b pb-4 md:flex-row md:items-start'>
				<div>
					<h2 className='text-balance text-2xl font-semibold tracking-tight md:text-3xl'>
						{dashboard.readyToPractice}
					</h2>
					<p className='my-2 max-w-prose text-pretty text-muted-foreground'>
						{dashboard.streak}
					</p>
					<Link
						href='/dashboard/create'
						style={{ viewTransitionName: 'create-interview' }}
						className={buttonVariants({
							className: 'w-full md:w-auto',
						})}
					>
						{dashboard.create_interview}
					</Link>
					<Separator className='my-4' />
					<Link
						href=''
						className={buttonVariants({
							variant: 'outline',
							className: 'w-full md:w-auto',
						})}
					>
						{dashboard.continueTraining}
					</Link>
				</div>

				{/* Illustration used from https://undraw.co/illustrations */}

				<Illustration className='h-max w-full md:max-w-md' />
			</section>
			<section className='grid w-full grid-cols-1 place-items-start gap-4 md:container md:grid-cols-2 lg:grid-cols-3'>
				<article className='w-full rounded-xl border p-6'>
					<h3 className='mb-4 text-2xl font-bold md:text-3xl'>
						{dashboard.yourAccounts}
					</h3>

					<AccountsTable accounts={accounts} />

					{accounts.length <= 2 && (
						<footer className='mt-4 flex w-full gap-2 border-t pt-4'>
							<Button className='w-full' variant='outline'>
								<PlusIcon className='mr-2 size-4' />
								{dashboard.addAccount}
							</Button>
							<Link
								href='/dashboard/settings'
								className={buttonVariants()}
								style={{ viewTransitionName: 'settings-page' }}
							>
								<SettingsIcon className='mr-2 size-4' />
								{dashboard.settings}
							</Link>
						</footer>
					)}
				</article>

				<article className='w-full rounded-xl border p-6'>
					<h3 className='text-balance text-2xl font-bold tracking-tight md:text-3xl'>
						{dashboard.yourCredits.replace(
							'{{credits}}',
							account.credits,
						)}
					</h3>
				</article>

				<article className='w-full rounded-xl border p-6'>
					<h3 className='text-2xl font-bold md:text-3xl'>
						{dashboard.cv.title}
					</h3>
					<p className='my-4 text-sm text-muted-foreground'>
						cv_name.pdf
					</p>
					<Button variant='outline' className='w-full'>
						<PlusIcon aria-label='Upload CV' />
					</Button>
				</article>
			</section>
		</main>
	);
};
export default Dashboard;
