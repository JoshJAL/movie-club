import { clubs } from '@/db/schema/clubs';
import { roles } from '@/db/schema/roles';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users_clubs_roles = sqliteTable('users_clubs_roles', {
  id: int().primaryKey({ autoIncrement: true }).notNull(),
  role_id: int()
    .references(() => roles.id)
    .notNull(),
  club_id: int()
    .references(() => clubs.id)
    .notNull(),
  user_id: text().notNull()
});
