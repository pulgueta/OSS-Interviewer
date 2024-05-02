import type { FC, PropsWithChildren } from 'react';

import { Navbar } from '@/components/navbar/no-user/navbar';
import { Footer } from '@/components/footer/footer';
import { UserNavbar } from '@/components/navbar/user/user-navbar';
import { currentUser } from '@/lib/get-session';

const LandingLayout: FC<PropsWithChildren> = async ({ children }) => {
	const user = await currentUser();

	return (
		<>
			{user ? <UserNavbar {...user} /> : <Navbar />}
			{children}
			<Footer />
		</>
	);
};
export default LandingLayout;
