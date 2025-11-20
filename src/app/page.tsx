import { getUserProfile } from '@/server/fetches/user';
import { redirect } from 'next/navigation';

export default async function Home() {
  const profile = await getUserProfile();

  if (!profile) {
    redirect('/settings/update');
  }

  return <div>This is something</div>;
}
