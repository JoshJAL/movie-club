import { ADMIN, CLUB } from '@/permissions';

import { db } from '@/db';
import { clubs } from '@/db/schema/clubs';
import { user_clubs } from '@/db/schema/users-clubs';
import { and, count, desc, eq, like, or } from 'drizzle-orm';
import { tryCatch } from 'ez-funcs';
import { getUserDetails } from './clerk';
import { getUserRoleInClub } from './roles';

export async function fetchUsersClubs(search?: string) {
  const { authed, user } = await getUserDetails();

  if (!authed || !user || !user.id) return [];

  const conditions = [];

  const defaultCondition = eq(user_clubs.user_id, user.id);

  conditions.push(defaultCondition);

  if (search && search.trim() !== '') {
    conditions.push(or(like(clubs.name, `%${search}%`)));
  }

  const { data, error } = await tryCatch(
    db
      .select()
      .from(clubs)
      .innerJoin(user_clubs, eq(clubs.id, user_clubs.club_id))
      .where(and(...conditions))
  );

  if (error || !data) return [];

  return data;
}

export async function fetchAllPublicClubs(search?: string) {
  const { authed, user } = await getUserDetails();

  if (!authed || !user || !user.id) return [];

  const conditions = [];

  const defaultCondition = eq(clubs.private, false);

  conditions.push(defaultCondition);

  if (search && search.trim() !== '') {
    conditions.push(or(like(clubs.name, `%${search}%`)));
  }

  const { data, error } = await tryCatch(
    db
      .select()
      .from(clubs)
      .where(and(...conditions))
  );

  if (error || !data) return [];

  return data;
}

export async function fetchTopTenPublicClubs(search?: string) {
  const { authed, user } = await getUserDetails();

  if (!authed || !user) return [];

  const conditions = [];

  const defaultCondition = eq(clubs.private, false);

  conditions.push(defaultCondition);

  if (search && search.trim() !== '') {
    conditions.push(like(clubs.name, `%${search}%`));
  }

  const { data, error } = await tryCatch(
    db
      .select({
        id: clubs.id,
        name: clubs.name,
        description: clubs.description,
        tags: clubs.tags,
        createdAt: clubs.createdAt,
        memberCount: count(user_clubs.id).as('member_count')
      })
      .from(clubs)
      .leftJoin(user_clubs, eq(clubs.id, user_clubs.club_id))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .groupBy(clubs.id)
      .orderBy(desc(count(user_clubs.id)))
      .limit(10)
  );

  if (error || !data) return [];

  return data;
}

export async function fetchClub(id: number) {
  const { authed, user } = await getUserDetails();

  if (!authed || !user || !user.id) return null;

  const { data, error } = await tryCatch(db.select().from(clubs).where(eq(clubs.id, id)));

  if (error || !data) return null;

  const club = data[0];

  if (club.private) {
    const role = await getUserRoleInClub(club.id);

    if (!role) return null;

    const permissions = role.permissions;

    if (permissions.includes(CLUB.read) || permissions.includes(ADMIN.read)) return club;

    return null;
  }

  return club;
}
