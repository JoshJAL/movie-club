export type UserProfile = {
  id: number;
  user_id: string;
  email: string;
  display_name: string;
  created_at: number;
  profile_image_url: string | null;
  followerCount: number;
  followingCount: number;
} | null;
