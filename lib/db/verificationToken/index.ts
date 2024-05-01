import { dbService } from '../main.config';
import {
	type TokenInsert,
	type TokenSelect,
	verificationToken,
} from '@/db/schema';

export const createToken = async (data: TokenInsert) => {
	const token = await dbService.insertToDB<TokenSelect>(
		verificationToken,
		data,
	);

	return token;
};

export const deleteTokenById = async (id: TokenSelect['id']) => {
	const token = await dbService.deleteById<TokenSelect>(
		verificationToken,
		verificationToken.id,
		id,
	);

	return token;
};
