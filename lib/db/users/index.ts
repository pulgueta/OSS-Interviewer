import { dbService } from '../main.config';
import { type UserInsert, type UserSelect, users } from '@/db/schema';
import { encrypt } from '@/lib/utils';

export const createUser = async ({ password, ...rest }: UserInsert) => {
	const user = await dbService.insertToDB<UserInsert>(users, {
		...rest,
		password: await encrypt(password),
	});

	return user;
};

export const deleteUserById = async (userId: UserSelect['id']) => {
	const user = await dbService.deleteById<UserSelect>(
		users,
		users.id,
		userId,
	);

	return user;
};

export const updateUserById = async (
	userId: UserSelect['id'],
	data: Partial<UserInsert>,
) => {
	const user = await dbService.updateById<UserSelect>(
		users,
		users.id,
		userId,
		data,
	);

	return user;
};

export const getAllUsers = async () => {
	const query = await dbService.getAllData<UserSelect[]>(users);

	return query;
};

export const getUserById = async (id: UserSelect['id']) => {
	const user = await dbService.getBy<UserSelect>(users.id, users, id);

	return user;
};

export const getUserByEmail = async (email: UserSelect['email']) => {
	const user = await dbService.getBy<UserSelect>(users.email, users, email);

	return user;
};
