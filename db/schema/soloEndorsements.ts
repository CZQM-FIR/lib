import { relations, type InferSelectModel } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { users } from '.';

export const soloEndorsements = sqliteTable('solo_endorsements', {
  id: int().primaryKey({ autoIncrement: true }),
  controllerId: int('controller_id')
    .notNull()
    .references(() => users.cid, { onDelete: 'cascade' }),
  expiresAt: int('expires_at')
    .notNull()
    .default(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
});

export const soloEndorsementRelations = relations(soloEndorsements, ({ one, many }) => ({
  controller: one(users, {
    fields: [soloEndorsements.controllerId],
    references: [users.cid]
  })
}));

export type SoloEndorsement = InferSelectModel<typeof soloEndorsements>;
