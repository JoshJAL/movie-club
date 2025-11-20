import { z } from 'zod';

export const user_profile_schema = z.object({
  user_id: z.string().min(1),
  email: z.email(),
  display_name: z.string().min(1),
  profile_image_url: z.union([z.string(), z.undefined()])
});
