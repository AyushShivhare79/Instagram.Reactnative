import { AppUser } from '@/types/user';
import { createSlice } from '@reduxjs/toolkit';

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
    setViewUserProfile(state, action) {
      state.items = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setViewUserProfile } = userSlice.actions;
