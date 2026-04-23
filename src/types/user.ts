import { Timestamp } from 'firebase/firestore';

export interface AppUser {
  uid: string;
  username: string;
  email: string;
  name: string;
  profilePicture: string | null;
  following: string[];
  followers: string[];
  createdAt: Timestamp | null;
}
