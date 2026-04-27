import { Timestamp } from 'firebase/firestore';
import { AppUser } from './user';

export interface Chat {
  id: string;
  createdAt: Timestamp;
  lastMessage: string;
  lastMessageAt: Timestamp;
  lastMessageSenderId: string;
  participants: string[];
  otherUser?: AppUser;

  unreadCounts: Record<string, number>;
}
