import type { FC, PropsWithChildren } from 'react';

import { Navbar } from '@/components/navbar/no-user/navbar';
import { Footer } from '@/components/footer/footer';

const LandingLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	);
};
export default LandingLayout;
