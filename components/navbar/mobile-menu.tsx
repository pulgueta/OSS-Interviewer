import { Link } from 'next-view-transitions';
import { MenuIcon } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from '@/components/ui/sheet';
import { navbar } from '@/i18n/en.json';

export const MobileMenu = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant='outline'
					size='icon'
					className='flex md:hidden'
				>
					<MenuIcon aria-label={navbar.buttonLabel} />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<ul className='grid gap-4 py-4'>
					<li>
						<SheetClose asChild>
							<Link
								style={{ viewTransitionName: 'pricing' }}
								href={navbar.links.pricing.href}
								className='font-medium'
							>
								{navbar.links.pricing.label}
							</Link>
						</SheetClose>
					</li>
					<li>
						<SheetClose asChild>
							<Link
								style={{ viewTransitionName: 'about' }}
								href={navbar.links.about.href}
								className='font-medium'
							>
								{navbar.links.about.label}
							</Link>
						</SheetClose>
					</li>
					<li>
						<SheetClose asChild>
							<Link
								style={{ viewTransitionName: 'faq' }}
								href={navbar.links.faq.href}
								className='font-medium'
							>
								{navbar.links.faq.label}
							</Link>
						</SheetClose>
					</li>
				</ul>

				<SheetClose asChild>
					<Link
						href={navbar.links.get_started.href}
						className={buttonVariants({
							variant: 'color',
							className: 'w-full',
						})}
					>
						{navbar.links.get_started.label}
					</Link>
				</SheetClose>
			</SheetContent>
		</Sheet>
	);
};
