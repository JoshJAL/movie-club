import Info from '@/components/ui/Info';
import Image from 'next/image';

import { EmeraldButtonLink } from '@/components/ui/ButtonLinks';
import { Suspense } from 'react';

import { getUserProfile } from '@/server/fetches/user';
import { getBase64 } from '@/utils/plaiceholder';
import { redirect } from 'next/navigation';

export default async function Page() {
  const profile = await getUserProfile();

  if (!profile) {
    redirect('/settings/update');
  }

  const base64 = await getBase64(profile.profile_image_url ?? '');

  return (
    <article>
      <section>
        <h1>Profile Settings</h1>
        <Suspense fallback={<p>Loading...</p>}>
          <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            <Info label={'Profile Image'}>
              <div className='relative mx-auto w-fit overflow-hidden rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)]'>
                <div className='pop absolute inset-0 z-10 bg-black/10' />
                <Image
                  blurDataURL={base64}
                  quality={60}
                  src={profile.profile_image_url ?? ''}
                  placeholder='blur'
                  alt={`${profile.display_name} profile image`}
                  className='relative z-0 h-auto w-80'
                  height={300}
                  width={300}
                  loading='eager'
                />
              </div>
            </Info>

            <div className='flex w-full flex-col gap-3'>
              <Info label={'Account Email'}>{profile.email}</Info>
              <Info label={'Display Name'}>{profile.display_name}</Info>
              <Info label={'Followers'}>
                <div className='flex w-full gap-3'>
                  {profile.followerCount}
                  <div className='flex-1' /> <EmeraldButtonLink href='/followes'>View</EmeraldButtonLink>
                </div>
              </Info>
              <Info label={'Following'}>
                <div className='flex w-full gap-3'>
                  {profile.followingCount}
                  <div className='flex-1' />
                  <EmeraldButtonLink href='/following'>View</EmeraldButtonLink>
                </div>
              </Info>
            </div>
          </div>
          <EmeraldButtonLink href='/settings/update' full>
            Update Settings
          </EmeraldButtonLink>
        </Suspense>
      </section>
    </article>
  );
}
