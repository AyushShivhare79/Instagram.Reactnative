import { Timestamp } from 'firebase/firestore';

export interface AppUser {
  uid: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  following: string[];
  followers: string[];
  createdAt: Timestamp | null;
}
