import type { FC, PropsWithChildren } from 'react';

import { ThemeProvider } from './theme-provider';

export const ClientProviders: FC<PropsWithChildren> = ({ children }) => {
	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='system'
			storageKey='ai-int-theme'
			enableSystem
			enableColorScheme
		>
			{children}
		</ThemeProvider>
	);
};
