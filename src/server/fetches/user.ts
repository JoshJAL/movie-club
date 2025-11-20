import { db } from '@/db';
import { user_profile } from '@/db/schema/user-profile';
import { users_following } from '@/db/schema/users-following';
import { and, count, desc, eq, like, or, sql } from 'drizzle-orm';
import { tryCatch } from 'ez-funcs';
import { getUserDetails } from './clerk';

export async function getUserProfile() {
  const { authed, user } = await getUserDetails();

  if (!authed || !user || !user.id) return null;

  const followers = db.$with('followers').as(
    db
      .select({
        profile_id: users_following.following_id,
        followerCount: count(users_following.user_id).as('follower_count')
      })
      .from(users_following)
      .groupBy(users_following.following_id)
  );

  const following = db.$with('following').as(
    db
      .select({
        profile_id: users_following.user_id,
        followingCount: count(users_following.following_id).as('following_count')
      })
      .from(users_following)
      .groupBy(users_following.user_id)
  );

  const { data, error } = await tryCatch(
    db
      .with(followers, following)
      .select({
        id: user_profile.id,
        user_id: user_profile.user_id,
        email: user_profile.email,
        display_name: user_profile.display_name,
        created_at: user_profile.created_at,
        profile_image_url: user_profile.profile_image_url,
        followerCount: sql<number>`COALESCE(${followers.followerCount}, 0)`,
        followingCount: sql<number>`COALESCE(${following.followingCount}, 0)`
      })
      .from(user_profile)
      .leftJoin(followers, eq(user_profile.id, followers.profile_id))
      .leftJoin(following, eq(user_profile.id, following.profile_id))
      .where(eq(user_profile.user_id, user.id))
  );

  if (error || !data || data.length === 0) return null;

  return data[0];
}

export async function getAllUsersProfiles(search?: string) {
  const { authed, user } = await getUserDetails();

  if (!authed || !user || !user.id) return [];

  const conditions = [];

  if (search && search.trim() !== '') {
    conditions.push(or(like(user_profile.display_name, `%${search}%`), like(user_profile.email, `%${search}%`)));
  }

  const { data, error } = await tryCatch(
    db
      .select({
        id: user_profile.id,
        user_id: user_profile.user_id,
        email: user_profile.email,
        display_name: user_profile.display_name,
        created_at: user_profile.created_at,
        profile_image_url: user_profile.profile_image_url,
        followerCount: count(users_following.user_id).as('follower_count')
      })
      .from(user_profile)
      .leftJoin(users_following, eq(user_profile.id, users_following.following_id))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .groupBy(user_profile.id)
  );

  if (error || !data) return [];

  return data;
}

export async function getTopTenUserProfiles() {
  const { authed, user } = await getUserDetails();

  if (!authed || !user) return [];

  const { data, error } = await tryCatch(
    db
      .select({
        id: user_profile.id,
        user_id: user_profile.user_id,
        email: user_profile.email,
        display_name: user_profile.display_name,
        created_at: user_profile.created_at,
        profile_image_url: user_profile.profile_image_url,
        followerCount: count(users_following.user_id).as('follower_count')
      })
      .from(user_profile)
      .leftJoin(users_following, eq(user_profile.id, users_following.following_id))
      .groupBy(user_profile.id)
      .orderBy(desc(count(users_following.user_id)))
      .limit(10)
  );

  if (error || !data) return [];

  return data;
}

export async function getUserProfileById(id: number) {
  const { authed, user } = await getUserDetails();

  if (!authed || !user || !user.id) return null;

  const followers = db.$with('followers').as(
    db
      .select({
        profile_id: users_following.following_id,
        followerCount: count(users_following.user_id).as('follower_count')
      })
      .from(users_following)
      .groupBy(users_following.following_id)
  );

  const following = db.$with('following').as(
    db
      .select({
        profile_id: users_following.user_id,
        followingCount: count(users_following.following_id).as('following_count')
      })
      .from(users_following)
      .groupBy(users_following.user_id)
  );

  const { data, error } = await tryCatch(
    db
      .with(followers, following)
      .select({
        id: user_profile.id,
        user_id: user_profile.user_id,
        email: user_profile.email,
        display_name: user_profile.display_name,
        created_at: user_profile.created_at,
        profile_image_url: user_profile.profile_image_url,
        followerCount: sql<number>`COALESCE(${followers.followerCount}, 0)`,
        followingCount: sql<number>`COALESCE(${following.followingCount}, 0)`
      })
      .from(user_profile)
      .leftJoin(followers, eq(user_profile.id, followers.profile_id))
      .leftJoin(following, eq(user_profile.id, following.profile_id))
      .where(eq(user_profile.id, id))
  );

  if (error || !data || data.length === 0) return null;

  return data[0];
}
