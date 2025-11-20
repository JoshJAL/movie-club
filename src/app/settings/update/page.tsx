import EditProfileSettingsForm from '@/components/forms/EditProfileSettingsForm';

import { Suspense } from 'react';

import { getUserDetails } from '@/server/fetches/clerk';
import { getUserProfile } from '@/server/fetches/user';

export default async function Page() {
  const [{ user: details }, profile] = await Promise.all([getUserDetails(), getUserProfile()]);

  return (
    <article>
      <h1>Update Profile Details</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <EditProfileSettingsForm details={details} profile={profile} />
      </Suspense>
    </article>
  );
}
