import type { FC } from 'react';

import { Trash2Icon } from 'lucide-react';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import type { AccountsSelect } from '@/db/schema';

type Data = {
	id: string;
	accountType: AccountsSelect['accountType'];
	profileId: string;
};

type AccountsData = {
	accounts: Data[];
};

export const AccountsTable: FC<AccountsData> = ({ accounts }) => {
	if (!accounts) return;

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Account type</TableHead>
					<TableHead className='text-pretty text-right'>
						Delete
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{accounts.map((account) => (
					<TableRow key={account.id}>
						<TableCell>
							{account.accountType!.toLocaleUpperCase()}
						</TableCell>
						<TableCell className='text-right'>
							<Button
								variant='destructive'
								size='icon'
								disabled={accounts.length <= 1}
							>
								<Trash2Icon
									aria-label='Delete account'
									className='size-4'
								/>
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
