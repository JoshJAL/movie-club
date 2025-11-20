import { BlueButtonLink, EmeraldButtonLink } from '@/components/ui/ButtonLinks';
import { Suspense } from 'react';

import { fetchTopTenPublicClubs, fetchUsersClubs } from '@/server/fetches/clubs';

export default async function Page(props: { searchParams: Promise<{ search: string }> }) {
  const { search } = await props.searchParams;

  const clubs = await fetchUsersClubs(search);

  if (clubs.length === 0) {
    const topTen = await fetchTopTenPublicClubs();

    return (
      <article>
        <h1>You&apos;re not a part of any clubs yet!</h1>
        <EmeraldButtonLink full href='/clubs/new'>
          Make a Club!
        </EmeraldButtonLink>

        <section>
          <BlueButtonLink full href='/clubs/discover'>
            Discover More!
          </BlueButtonLink>
          <Suspense fallback={<p>Loading...</p>}>
            <pre>{JSON.stringify(topTen, null, 2)}</pre>
          </Suspense>
        </section>
      </article>
    );
  }

  return (
    <article>
      <Suspense fallback={<p>Loading...</p>}>
        <pre>{JSON.stringify(clubs, null, 2)}</pre>
      </Suspense>
    </article>
  );
}
