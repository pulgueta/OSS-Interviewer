import { currentUser } from '@/lib/get-session';

const Dashboard = async () => {
	const user = await currentUser();

	return (
		<main className='flex min-h-[92.3dvh] flex-col items-center justify-center p-4'>
			<pre>{JSON.stringify(user, null, 4)}</pre>
		</main>
	);
};
export default Dashboard;
