import { type InferInsertModel, type InferSelectModel, eq } from 'drizzle-orm';
import type { PgColumn, PgTable } from 'drizzle-orm/pg-core';

import { db } from '@/db';

export class DatabaseService {
	constructor() {}

	async getAllData<const T>(table: PgTable) {
		const query = await db.select().from(table);

		return query.length > 1 ? (query as T[]) : (query as T);
	}

	async getBy<const T>(column: PgColumn, table: PgTable, payload: string) {
		const [query] = await db
			.select()
			.from(table)
			.where(eq(column, payload));

		return query as T;
	}

	async insertToDB<const T>(
		table: PgTable,
		data: InferInsertModel<typeof table>,
	): Promise<T | T[]> {
		const queryBuilder = await db.insert(table).values(data).returning();

		return queryBuilder.length > 1
			? (queryBuilder as T[])
			: (queryBuilder[0] as T);
	}

	async deleteById<const T>(table: PgTable, tableId: PgColumn, id: string) {
		const [query] = await db
			.delete(table)
			.where(eq(tableId, id))
			.returning();

		return query as T;
	}

	async updateById<const T>(
		table: PgTable,
		tableId: PgColumn,
		id: string,
		data: Partial<InferSelectModel<typeof table>>,
	) {
		const [query] = await db
			.update(table)
			.set(data)
			.where(eq(tableId, id))
			.returning();

		return query as T;
	}
}

export const dbService = new DatabaseService();
