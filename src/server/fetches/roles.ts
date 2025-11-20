import { db } from '@/db';
import { roles } from '@/db/schema/roles';
import { users_clubs_roles } from '@/db/schema/users-clubs-roles';
import { and, eq } from 'drizzle-orm';
import { tryCatch } from 'ez-funcs';
import { getUserDetails } from './clerk';

export async function getUserRoleInClub(club_id: number) {
  const { authed, user } = await getUserDetails();

  if (!authed || !user || !user.id) return null;

  const { data: users_clubs_roles_data, error: users_clubs_roles_error } = await tryCatch(
    db
      .select()
      .from(users_clubs_roles)
      .where(and(eq(users_clubs_roles.user_id, user.id), eq(users_clubs_roles.club_id, club_id)))
  );

  if (users_clubs_roles_error) {
    console.error('Error fetching user roles:', users_clubs_roles_error.message);
    return null;
  }

  const { data, error } = await tryCatch(
    db.select().from(roles).where(eq(roles.id, users_clubs_roles_data[0].role_id))
  );

  if (error) {
    console.error('Error fetching user roles:', error.message);
    return null;
  }

  return data[0];
}
