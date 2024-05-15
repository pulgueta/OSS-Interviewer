import {
	relations,
	type InferInsertModel,
	type InferSelectModel,
} from 'drizzle-orm';
import {
	boolean,
	integer,
	json,
	jsonb,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';

import { createId } from '@/lib/utils';

export const accountTypeEnum = pgEnum('account_type', [
	'personal',
	'enterprise',
]);

export const roleEnum = pgEnum('role', ['user', 'admin']);

export const planEnum = pgEnum('plan', [
	'free',
	'basic',
	'professional',
	'team',
	'enterprise',
	'custom',
]);

// Users table

export const users = pgTable('users', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId('user')),
	username: varchar('username', { length: 32 }).notNull().unique(),
	firstName: varchar('first_name', { length: 64 }).notNull(),
	lastName: varchar('last_name', { length: 64 }).notNull(),
	email: varchar('email', { length: 128 }).unique().notNull(),
	password: varchar('password', { length: 256 }).notNull(),
	role: roleEnum('role').default('user'),
	plan: planEnum('plan').default('free'),
	emailVerified: boolean('emailVerified').default(false),
	photoURL: varchar('photo_url'),
	cvURL: varchar('cv_url'),
	accounts: jsonb('accounts').array().$type<
		{
			id: string;
			accountType: 'personal' | 'enterprise';
			profileId: string;
		}[]
	>(),
	interviews: jsonb('interviews').array().$type<
		{
			id: string;
			title: string;
		}[]
	>(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at')
		.$onUpdate(() => new Date())
		.defaultNow(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
	verificationToken: one(verificationToken, {
		fields: [users.id],
		references: [verificationToken.userId],
		relationName: 'verificationToken',
	}),
	accounts: many(accounts, { relationName: 'accounts' }),
}));

export type UserSelect = InferSelectModel<typeof users>;
export type UserInsert = InferInsertModel<typeof users>;

// Interviews table

export const interviews = pgTable('interviews', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId('interview')),
});

// Accounts table

export const accounts = pgTable('accounts', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId('account')),
	profileId: varchar('profile_id').references(() => users.id, {
		onDelete: 'cascade',
	}),
	accountType: accountTypeEnum('account_type').default('personal'),
	credits: integer('credits').default(3),
	teams: jsonb('teams').array().$type<Teams[]>(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at')
		.$onUpdate(() => new Date())
		.defaultNow(),
});

export const accountsRelations = relations(accounts, ({ one, many }) => ({
	user: one(users, {
		fields: [accounts.profileId],
		references: [users.id],
		relationName: 'accounts',
	}),
	teams: many(teams, { relationName: 'teams' }),
}));

export type AccountsSelect = InferSelectModel<typeof accounts>;
export type AccountsInsert = InferInsertModel<typeof accounts>;

interface Teams extends TeamsSelect {}

// Teams table

export const teams = pgTable('teams', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId('teams')),
	accountId: varchar('account_id').references(() => accounts.id, {
		onDelete: 'cascade',
	}),
	users: json('users').$type<UserSelect[]>(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at')
		.$onUpdate(() => new Date())
		.defaultNow(),
});

export const teamsRelations = relations(teams, ({ one }) => ({
	account: one(accounts, {
		fields: [teams.accountId],
		references: [accounts.id],
		relationName: 'teams',
	}),
}));

export type TeamsSelect = InferSelectModel<typeof teams>;
export type TeamsInsert = InferInsertModel<typeof teams>;

// Verification token table

export const verificationToken = pgTable('verification_token', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId('token')),
	userId: varchar('user_id')
		.references(() => users.id, { onDelete: 'cascade' })
		.notNull(),
	code: uuid('code').defaultRandom(),
	expires: timestamp('expires'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at')
		.$onUpdate(() => new Date())
		.defaultNow(),
});

export const verificationTokenRelations = relations(
	verificationToken,
	({ one }) => ({
		user: one(users, {
			fields: [verificationToken.userId],
			references: [users.id],
			relationName: 'verificationToken',
		}),
	}),
);

export type TokenSelect = InferSelectModel<typeof verificationToken>;
export type TokenInsert = InferInsertModel<typeof verificationToken>;
