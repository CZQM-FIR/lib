import { relations, type InferSelectModel } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { positions, users } from '.';

export const roster = sqliteTable('roster', {
	id: int().primaryKey({ autoIncrement: true }),
	controllerId: int('controller_id')
		.notNull()
		.references(() => users.cid, { onDelete: 'cascade' }),
	position: text('position').notNull(),
	status: int('status').notNull()
});

export const rosterRelations = relations(roster, ({ one, many }) => ({
	controller: one(users, {
		fields: [roster.controllerId],
		references: [users.cid]
	})
}));

export type RosterStatus = InferSelectModel<typeof roster>;

export type RosterPosition = 'gnd' | 'twr' | 'app' | 'ctr';
