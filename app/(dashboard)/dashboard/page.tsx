import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { currentUser } from '@/lib/get-session';
import { getUserById } from '@/lib/db/users';
import { AccountsTable } from './components/accounts-table';
import { getAccountsById } from '@/lib/db/accounts';

const Dashboard = async () => {
	const user = await currentUser();

	if (!user) return;

	const { accounts } = await getUserById(user.id);

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
				<h1 className='text-balance text-2xl font-bold tracking-tighter md:text-4xl'>
					Welcome back, {user.firstName}
				</h1>
			</header>
			<section className='my-4 grid w-full grid-cols-1 place-items-start gap-4 md:container md:grid-cols-2 lg:grid-cols-3'>
				<article className='w-full rounded-xl border p-4'>
					<h4 className='mb-4 text-2xl font-bold md:text-3xl'>
						Tus cuentas
					</h4>

					<AccountsTable accounts={accounts} />

					{accounts.length <= 2 && (
						<footer className='mt-4 w-full border-t pt-4'>
							<Button className='w-full'>
								<PlusIcon className='mr-2 size-4' /> Add account
							</Button>
						</footer>
					)}
				</article>

				<article className='w-full rounded-xl border p-4'>
					<h4 className='text-2xl font-bold md:text-3xl'>
						Tus créditos: {account.credits}
					</h4>
				</article>

				<article className='w-full rounded-xl border p-4'>
					<h4 className='text-2xl font-bold md:text-3xl'>
						Tus CV actual
					</h4>
					<p className='my-2 text-sm text-muted-foreground'>
						nombre_de_tu_cv.pdf
					</p>
					<div className='mb-2 h-28 w-full rounded-lg bg-neutral-600' />
					<Button variant='outline' className='w-full'>
						<PlusIcon />
					</Button>
				</article>
			</section>
		</main>
	);
};
export default Dashboard;
