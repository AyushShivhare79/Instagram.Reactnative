import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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

interface UserState {
  items: AppUser | null;
}

const initialState: UserState = {
  items: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.items = action.payload;
    },
    clearUser(state) {
      state.items = null;
    },
    followUser: (
      state,
      action: PayloadAction<{ currentUserId: string; targetUserId: string }>,
    ) => {
      const { currentUserId, targetUserId } = action.payload;

      if (!state.user.following.includes(targetUserId)) {
        state.user.following.push(targetUserId);
      }
    },

    unfollowUser: (
      state,
      action: PayloadAction<{ currentUserId: string; targetUserId: string }>,
    ) => {
      const { currentUserId, targetUserId } = action.payload;

      state.user.following = state.user.following.filter(
        id => id !== targetUserId,
      );

      const targetUser = state.users?.[targetUserId];
      if (targetUser) {
        targetUser.followers = targetUser.followers.filter(
          id => id !== currentUserId,
        );
      }
    },
  },
});

export default userSlice.reducer;
export const { setUser, clearUser } = userSlice.actions;
