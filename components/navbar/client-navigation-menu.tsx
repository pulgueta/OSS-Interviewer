'use client';

import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from 'react';

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { default as translations } from '@/i18n/en.json';

export const ClientNavigationMenu = () => {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger className='text-base'>
						{translations.navbar.links.pricing.label}
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
							<ListItem
								href={`${translations.navbar.links.pricing.href}?pr=personal`}
								title='Personal'
							>
								{
									translations.navbar.pricing.personal
										.description
								}
							</ListItem>
							<ListItem
								href={`${translations.navbar.links.pricing.href}?pr=enterprise`}
								title='Enterprise'
							>
								{
									translations.navbar.pricing.enterprise
										.description
								}
							</ListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
};

const ListItem = forwardRef<ElementRef<'a'>, ComponentPropsWithoutRef<'a'>>(
	({ className, title, children, ...props }, ref) => {
		return (
			<li>
				<NavigationMenuLink asChild>
					<a
						style={{ viewTransitionName: title }}
						ref={ref}
						className={cn(
							'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
							className,
						)}
						{...props}
					>
						<div className='text-sm font-medium leading-none'>
							{title}
						</div>
						<p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
							{children}
						</p>
					</a>
				</NavigationMenuLink>
			</li>
		);
	},
);
ListItem.displayName = 'ListItem';
