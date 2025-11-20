import { clubs } from '@/db/schema/clubs';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user_clubs = sqliteTable('user_clubs', {
  id: int().primaryKey({ autoIncrement: true }),
  user_id: text().notNull(),
  club_id: int()
    .references(() => clubs.id)
    .notNull()
});
