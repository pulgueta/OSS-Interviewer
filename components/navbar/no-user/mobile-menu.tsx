import Link from 'next/link';
import { MenuIcon } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from '@/components/ui/sheet';
import { default as translations } from '@/i18n/en.json';

export const MobileMenu = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant='outline'
					size='icon'
					className='flex md:hidden'
				>
					<MenuIcon aria-label={translations.navbar.buttonLabel} />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<ul className='grid gap-4 py-4'>
					{translations.navbar.user.links.map((link) => (
						<li key={link.href}>
							<SheetClose asChild>
								<Link
									href={link.href}
									className='font-medium'
									prefetch={false}
								>
									{link.label}
								</Link>
							</SheetClose>
						</li>
					))}
				</ul>

				<SheetClose asChild>
					<Link
						href={translations.navbar.get_started.href}
						className={buttonVariants({
							variant: 'color',
							className: 'w-full',
						})}
					>
						{translations.navbar.get_started.label}
					</Link>
				</SheetClose>
			</SheetContent>
		</Sheet>
	);
};
