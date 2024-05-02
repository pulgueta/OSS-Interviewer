import type { FC, PropsWithChildren } from 'react';

import { redirect } from 'next/navigation';

import { currentUser } from '@/lib/get-session';
import { UserNavbar } from '@/components/navbar/user/user-navbar';

const DashboardLayout: FC<PropsWithChildren> = async ({ children }) => {
	const user = await currentUser();

	if (!user) {
		return redirect('/login');
	}

	return (
		<>
			{user && <UserNavbar {...user} />}
			{children}
		</>
	);
};
export default DashboardLayout;
