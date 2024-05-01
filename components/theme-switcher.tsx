'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { default as translations } from '@/i18n/en.json';

export const ThemeSwitcher = () => {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='icon'>
					<Sun className='size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
					<Moon className='absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
					<span className='sr-only'>{translations.theme.toggle}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem onClick={() => setTheme('light')}>
					{translations.theme.light}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>
					{translations.theme.dark}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>
					{translations.theme.system}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
