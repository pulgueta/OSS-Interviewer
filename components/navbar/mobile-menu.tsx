import { Link } from 'next-view-transitions';
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
					<li>
						<SheetClose asChild>
							<Link
								style={{ viewTransitionName: 'pricing' }}
								href={translations.navbar.links.pricing.href}
								className='font-medium'
							>
								{translations.navbar.links.pricing.label}
							</Link>
						</SheetClose>
					</li>
					<li>
						<SheetClose asChild>
							<Link
								style={{ viewTransitionName: 'about' }}
								href={translations.navbar.links.about.href}
								className='font-medium'
							>
								{translations.navbar.links.about.label}
							</Link>
						</SheetClose>
					</li>
					<li>
						<SheetClose asChild>
							<Link
								style={{ viewTransitionName: 'faq' }}
								href={translations.navbar.links.faq.href}
								className='font-medium'
							>
								{translations.navbar.links.faq.label}
							</Link>
						</SheetClose>
					</li>
				</ul>

				<SheetClose asChild>
					<Link
						href={translations.navbar.links.get_started.href}
						className={buttonVariants({
							variant: 'color',
							className: 'w-full',
						})}
					>
						{translations.navbar.links.get_started.label}
					</Link>
				</SheetClose>
			</SheetContent>
		</Sheet>
	);
};
