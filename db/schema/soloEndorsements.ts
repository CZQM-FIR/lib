import { relations, type InferSelectModel } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { positions, users } from '.';

export const soloEndorsements = sqliteTable('solo_endorsements', {
	id: int().primaryKey({ autoIncrement: true }),
	controllerId: int('controller_id')
		.notNull()
		.references(() => users.cid, { onDelete: 'cascade' }),
	expiresAt: int('expires_at')
		.notNull()
		.default(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
	positionId: int('position_id')
		.notNull()
		.references(() => positions.id)
});

export const soloEndorsementRelations = relations(soloEndorsements, ({ one, many }) => ({
	controller: one(users, {
		fields: [soloEndorsements.controllerId],
		references: [users.cid]
	}),
	position: one(positions, {
		fields: [soloEndorsements.positionId],
		references: [positions.id]
	})
}));

export type SoloEndorsement = InferSelectModel<typeof soloEndorsements>;
