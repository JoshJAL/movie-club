'use client';

import Image from 'next/image';
import FormWrapper from './ui/ForWrapper';

import { UploadDropzone } from '@/utils/uploadthing';

import { updateUserProfile } from '@/server/actions/user';
import { user_profile_schema } from '@/zod-schemas/user_profile';
import { useRouter } from 'next/navigation';
import { useAppForm } from './ui';

import type { UserDetails } from '@/types/user_details';
import type { UserProfile } from '@/types/user_profile';

interface Props {
  details: UserDetails;
  profile: UserProfile;
}

export default function EditProfileSettingsForm({ details, profile }: Props) {
  const router = useRouter();

  const fullName = `${details?.given_name} ${details?.family_name}`;

  const form = useAppForm({
    defaultValues: {
      user_id: details?.id,
      email: details?.email,
      display_name: profile?.display_name || fullName,
      profile_image_url: profile?.profile_image_url ?? undefined
    },
    validators: {
      onChange: user_profile_schema
    },
    onSubmit: async ({ value }) => {
      if (!confirm('Are you sure you want to update your profile settings?')) {
        return;
      }

      const success = await updateUserProfile(value as UserProfile);

      if (!success) {
        alert('There was an error updating your profile. Please try again.');
        return;
      }

      router.push('/settings');
    }
  });

  return (
    <FormWrapper handleSubmit={form.handleSubmit}>
      <form.AppField name='display_name'>{(field) => <field.TextField label='Display Name' />}</form.AppField>
      <form.AppForm>
        {profile?.profile_image_url && (
          <Image
            width={300}
            height={300}
            className='mx-auto rounded-lg'
            alt={`${fullName} profile image`}
            src={form.state.values.profile_image_url as string}
          />
        )}
        {form.state.values.profile_image_url && <h2>Upload a different image</h2>}
        {!form.state.values.profile_image_url && <h2>Upload a profile image</h2>}
        <form.AppField name='profile_image_url'>
          {(field) => (
            <UploadDropzone
              endpoint='imageUploader'
              onClientUploadComplete={(res) => {
                const fileUrl = res[0].ufsUrl;
                console.log('This is the image data: ', res);

                field.state.value = fileUrl;
                field.handleChange(fileUrl);

                alert('Upload Complete');
              }}
              onUploadError={(error) => {
                alert('Upload Error: ' + error.message);
              }}
            />
          )}
        </form.AppField>
        <form.SubmitButton text='Update Profile' submittingText='Updating...' />
      </form.AppForm>
    </FormWrapper>
  );
}
