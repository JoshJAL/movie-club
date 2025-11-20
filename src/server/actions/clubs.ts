import { ADMIN, CLUB } from '@/permissions';

import { db } from '@/db';
import { clubs } from '@/db/schema/clubs';
import { getUserRoleInClub } from '@/server/fetches/roles';
import { eq } from 'drizzle-orm';
import { tryCatch } from 'ez-funcs';
import { getUserDetails } from '../fetches/clerk';

import type { Club, ClubCreate } from '@/types/club';

export async function createClub(club: ClubCreate) {
  const { authed, user } = await getUserDetails();

  if (!authed || !user || !user.id) return null;

  const { data, error } = await tryCatch(db.insert(clubs).values(club).returning());

  if (error) {
    console.error('Error creating club: ', error.message);

    return null;
  }

  return data[0].id;
}

export async function updateClub(club: Club) {
  const { authed, user } = await getUserDetails();

  if (!authed || !user || !user.id) return false;

  const userRoles = await getUserRoleInClub(club.id);

  if (!userRoles) return false;

  const permissions = userRoles.permissions.split(',').map((permission) => permission.trim());

  if (permissions.includes(ADMIN.update) || permissions.includes(CLUB.update)) {
    const { data, error } = await tryCatch(
      db
        .update(clubs)
        .set({ name: club.name.trim(), description: club.description.trim(), tags: club.tags.trim() })
        .where(eq(clubs.id, club.id))
        .returning()
    );

    if (error) {
      console.error('Error updating club: ', error.message);

      return false;
    }

    return data.length > 0;
  }

  return false;
}

export async function deleteClub(club: Club) {
  const { authed, user } = await getUserDetails();

  if (!authed || !user || !user.id) return false;

  const userRoles = await getUserRoleInClub(club.id);

  if (!userRoles) return false;

  const permissions = userRoles.permissions.split(',').map((permission) => permission.trim());

  if (permissions.includes(ADMIN.delete) || permissions.includes(CLUB.delete)) {
    const { error } = await tryCatch(db.delete(clubs).where(eq(clubs.id, club.id)));

    if (error) {
      console.error('Error deleting club: ', error.message);

      return false;
    }

    return true;
  }

  return false;
}
