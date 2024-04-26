import { dbService } from '../main.config';
import { type TeamsInsert, type TeamsSelect, teams } from '@/db/schema';

export const createTeam = async (data: TeamsInsert) => {
	const team = await dbService.insertToDB<TeamsInsert>(teams, data);

	return team;
};

export const deleteTeamById = async (teamId: TeamsSelect['id']) => {
	const user = await dbService.deleteById<TeamsSelect>(
		teams,
		teams.id,
		teamId,
	);

	return user;
};

export const updateTeamById = async (
	teamId: TeamsSelect['id'],
	data: Partial<TeamsInsert>,
) => {
	const user = await dbService.updateById<TeamsSelect>(
		teams,
		teams.id,
		teamId,
		data,
	);

	return user;
};

export const getAllTeams = async () => {
	const query = await dbService.getAllData<TeamsSelect[]>(teams);

	return query;
};

export const getTeamById = async (id: TeamsSelect['id']) => {
	const query = await dbService.getBy<TeamsSelect>(teams.id, teams, id);

	return query;
};
