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
					aria-label='Open menu'
				>
					<MenuIcon />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<ul className='grid gap-4 py-4'>
					<li>
						<SheetClose asChild>
							<Link href='/pricing' className='font-medium'>
								{navbar.links.pricing}
							</Link>
						</SheetClose>
					</li>
					<li>
						<SheetClose asChild>
							<Link href='/docs' className='font-medium'>
								{navbar.links.documentation}
							</Link>
						</SheetClose>
					</li>
					<li>
						<SheetClose asChild>
							<Link href='/about' className='font-medium'>
								{navbar.links.about}
							</Link>
						</SheetClose>
					</li>
					<li>
						<SheetClose asChild>
							<Link href='/faq' className='font-medium'>
								{navbar.links.faq}
							</Link>
						</SheetClose>
					</li>
				</ul>

				<Link
					href='/register'
					className={buttonVariants({
						variant: 'color',
						className: 'w-full',
					})}
				>
					{navbar.links.get_started}
				</Link>
			</SheetContent>
		</Sheet>
	);
};
