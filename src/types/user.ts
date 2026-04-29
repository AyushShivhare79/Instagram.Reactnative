export interface AppUser {
  uid: string;
  username: string;
  email: string;
  name: string;
  profilePicture?: string | null;
  bio?: string | null;
  website?: string | null;
  gender?: string | null;

  following: string[];
  followers: string[];

  createdAt?: string | null;
}
