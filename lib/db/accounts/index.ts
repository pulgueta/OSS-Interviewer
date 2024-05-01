import { dbService } from '../main.config';
import {
	type AccountsInsert,
	type AccountsSelect,
	accounts,
} from '@/db/schema';

export const createAccount = async (data: AccountsInsert) => {
	const accountsQuery = await dbService.insertToDB<AccountsInsert>(
		accounts,
		data,
	);

	return accountsQuery;
};

export const deleteAccountById = async (accountId: AccountsSelect['id']) => {
	const account = await dbService.deleteById<AccountsSelect>(
		accounts,
		accounts.id,
		accountId,
	);

	return account;
};

export const updateAccountById = async (
	accountsId: AccountsSelect['id'],
	data: Partial<AccountsInsert>,
) => {
	const account = await dbService.updateById<AccountsSelect>(
		accounts,
		accounts.id,
		accountsId,
		data,
	);

	return account;
};

export const getAllaccountss = async () => {
	const query = await dbService.getAllData<AccountsSelect[]>(accounts);

	return query;
};

export const getaccountsById = async (id: AccountsSelect['id']) => {
	const query = await dbService.getBy<AccountsSelect>(
		accounts.id,
		accounts,
		id,
	);

	return query;
};
