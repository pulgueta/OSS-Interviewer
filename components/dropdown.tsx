'use client';

import { type FC, useState } from 'react';

import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export type DropdownParsedData = {
	label: string;
	value: string;
};

type DropdownData = {
	data: DropdownParsedData[];
	label: string;
	selectLabel: string;
	notFoundLabel: string;
};

export const Dropdown: FC<DropdownData> = ({
	data,
	label,
	notFoundLabel,
	selectLabel,
}) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('');

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className='w-48 justify-between'
				>
					{value
						? data.find((d) => d.value === value)?.label
						: selectLabel}
					<ChevronsUpDownIcon className='ml-2 size-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-48 p-0'>
				<Command>
					<CommandInput placeholder={label} />
					<CommandList>
						<CommandEmpty>{notFoundLabel}</CommandEmpty>
						<CommandGroup>
							{data.map((data) => (
								<CommandItem
									key={data.value}
									value={data.value}
									onSelect={(currentValue) => {
										setValue(
											currentValue === value
												? ''
												: currentValue,
										);
										setOpen(false);
									}}
								>
									<CheckIcon
										className={cn(
											'mr-2 size-4',
											value === data.value
												? 'opacity-100'
												: 'opacity-0',
										)}
									/>
									{data.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
