'use server';

import { db } from '@/db';
import { user_profile } from '@/db/schema/user-profile';
import { eq, and } from 'drizzle-orm';
import { tryCatch } from 'ez-funcs';
import { getUserDetails } from '@/server/fetches/clerk';
import { getUserProfile } from '@/server/fetches/user';

import type { UserProfile } from '@/types/user_profile';

export async function updateUserProfile(userProfile: UserProfile) {
  const { authed, user } = await getUserDetails();

  if (!authed || !user || !user.id || !user.email) return false;

  if (!userProfile) return false;

  const profile = await getUserProfile();

  if (!profile) {
    const { error } = await tryCatch(
      db.insert(user_profile).values({
        user_id: user.id,
        email: user.email,
        display_name: userProfile.display_name.trim(),
        profile_image_url: userProfile.profile_image_url?.trim() ?? ''
      })
    );

    if (error) {
      console.error('Error creating user profile: ', error.message);
      return false;
    }

    return true;
  }

  const { error } = await tryCatch(
    db
      .update(user_profile)
      .set({
        user_id: user.id,
        email: user.email,
        display_name: userProfile.display_name.trim(),
        profile_image_url: userProfile.profile_image_url?.trim() ?? ''
      })
      .where(and(eq(user_profile.id, profile.id), eq(user_profile.user_id, user.id)))
  );

  if (error) {
    console.error('Error updating user profile: ', error.message);
    return false;
  }

  return true;
}
