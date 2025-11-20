import { currentUser } from '@clerk/nextjs/server';
import { cache } from 'react';

export const getUserDetails = cache(
  async (): Promise<{
    authed: boolean;
    user: {
      email: null | string;
      given_name: null | string;
      family_name: null | string;
      id: null | string;
    } | null;
  }> => {
    const user = await currentUser();

    const authed = !!user;

    if (!authed) {
      return { authed, user: null };
    } else {
      const userDetails = {
        email: user.emailAddresses[0].emailAddress ?? null,
        given_name: user.firstName,
        family_name: user.lastName,
        id: user.id
      };

      return { authed, user: userDetails };
    }
  }
);
