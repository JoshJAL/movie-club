import { int, sqliteTable } from 'drizzle-orm/sqlite-core';
import { user_profile } from './user-profile';

export const users_following = sqliteTable('users_following', {
  id: int().primaryKey({ autoIncrement: true }).notNull(),
  following_id: int()
    .references(() => user_profile.id)
    .notNull(),
  user_id: int()
    .references(() => user_profile.id)
    .notNull()
});
