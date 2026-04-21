import { Timestamp } from 'firebase/firestore';
import { AppUser } from './user';

export interface Posts {
  id: string;
  image: string;
  user: AppUser;
  likes: string[];
  caption: string;
  userId: string;
  createdAt: Timestamp;
}
