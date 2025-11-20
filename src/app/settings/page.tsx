import { Suspense } from 'react';

import { getUserDetails } from '@/server/fetches/clerk';
import { getUserProfile } from '@/server/fetches/user';

export default async function Page() {
  const [{ user: details }, profile] = await Promise.all([getUserDetails(), getUserProfile()]);

  return (
    <article>
      <section>
        <h1>Profile Settings</h1>
        <Suspense fallback={<p>Loading...</p>}>
          <pre>{JSON.stringify(details, null, 2)}</pre>
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </Suspense>
      </section>
    </article>
  );
}
