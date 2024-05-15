import type { FC, PropsWithChildren } from 'react';

import { UserNavbar } from '@/components/navbar/user/user-navbar';

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<UserNavbar />
			{children}
		</>
	);
};
export default DashboardLayout;
