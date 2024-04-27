import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
	integer,
	json,
	pgEnum,
	pgTable,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';

import { createId } from '@/lib/utils';

const accountTypeEnum = pgEnum('account_type', ['personal', 'enterprise']);

// Users table

export const users = pgTable('users', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId('user')),
	username: varchar('username', { length: 32 }).notNull(),
	firstName: varchar('first_name', { length: 64 }).notNull(),
	lastName: varchar('last_name', { length: 64 }).notNull(),
	email: varchar('email', { length: 128 }).unique().notNull(),
	password: varchar('password', { length: 256 }).notNull(),
	createdAt: timestamp('created_at', {
		mode: 'date',
		precision: 3,
	}).defaultNow(),
	updatedAt: timestamp('updated_at', {
		mode: 'date',
		precision: 3,
	}).$onUpdate(() => new Date()),
});

export type UserSelect = InferSelectModel<typeof users>;
export type UserInsert = InferInsertModel<typeof users>;

// Teams table

export const teams = pgTable('teams', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId('teams')),
	accountId: varchar('account_id').references(() => accounts.id, {
		onDelete: 'cascade',
	}),
	users: json('users').$type<UserSelect[]>(),
	createdAt: timestamp('created_at', {
		mode: 'date',
		precision: 3,
	}).defaultNow(),
	updatedAt: timestamp('updated_at', {
		mode: 'date',
		precision: 3,
	}).$onUpdate(() => new Date()),
});

export type TeamsSelect = InferSelectModel<typeof teams>;
export type TeamsInsert = InferInsertModel<typeof teams>;

// Accounts table

export const accounts = pgTable('accounts', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId('account')),
	profileId: varchar('profile_id').references(() => users.id, {
		onDelete: 'cascade',
	}),
	accountType: accountTypeEnum('account_type'),
	credits: integer('credits').default(3),
	createdAt: timestamp('created_at', {
		mode: 'date',
		precision: 3,
	}).defaultNow(),
	updatedAt: timestamp('updated_at', {
		mode: 'date',
		precision: 3,
	}).$onUpdate(() => new Date()),
});

export type AccountsSelect = InferSelectModel<typeof accounts>;
export type AccountsInsert = InferInsertModel<typeof accounts>;
