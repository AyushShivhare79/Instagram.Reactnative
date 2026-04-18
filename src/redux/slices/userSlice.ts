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
    followUser: (state, action: PayloadAction<{ targetUserId: string }>) => {
      const { targetUserId } = action.payload;

      if (!state.items?.following.includes(targetUserId)) {
        state.items?.following.push(targetUserId);
      }
    },

    unfollowUser: (state, action: PayloadAction<{ targetUserId: string }>) => {
      const { targetUserId } = action.payload;

      if (state.items?.following.includes(targetUserId)) {
        state.items.following = state.items?.following.filter(
          id => id !== targetUserId,
        );
      }
    },
  },
});

export default userSlice.reducer;
export const { setUser, clearUser, followUser, unfollowUser } =
  userSlice.actions;
